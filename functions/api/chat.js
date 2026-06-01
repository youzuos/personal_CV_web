// Cloudflare Pages Function: POST /api/chat
// Streams Deepseek chat completions back to the browser as plain text deltas.

const formatResumeData = (resume) => {
  try {
    const education = resume.education?.map(e => `- ${e.degree} at ${e.school} (${e.period})`).join('\n') || 'Not specified'
    const experience = resume.experience?.map(e => `- ${e.position} at ${e.company} (${e.period})\n  ${(e.achievements || []).join('\n  ')}`).join('\n\n') || 'Not specified'
    const projects = resume.projects?.slice(0, 5).map(p => `- ${p.title}: ${p.description}`).join('\n') || 'Not specified'
    const awards = resume.awards?.slice(0, 5).map(a => `- ${a}`).join('\n') || 'Not specified'
    const progSkills = resume.skills?.programming?.join(', ') || 'Not specified'
    const frameworks = resume.skills?.frameworks?.join(', ') || 'Not specified'
    const tools = resume.skills?.tools?.join(', ') || 'Not specified'

    return `NAME: ${resume.name || 'Candidate'}
TAGLINE: ${resume.tagline || ''}

EDUCATION:
${education}

EXPERIENCE:
${experience}

PROJECTS:
${projects}

AWARDS:
${awards}

SKILLS:
Programming: ${progSkills}
Frameworks: ${frameworks}
Tools: ${tools}`.trim()
  } catch {
    return `NAME: ${resume?.name || 'Candidate'}
Resume data format error`
  }
}

const buildSystemPrompt = (resumeData, jobTitle, jobRequirements, language) => {
  const formattedResume = formatResumeData(resumeData)
  const isZh = language === 'zh'

  if (isZh) {
    let prompt = `你是一个专业的招聘助手，帮助雇主评估候选人简历与职位的匹配度。你的任务是根据候选人简历和雇主提供的职位信息回答问题。

【候选人简历】
${formattedResume}`

    if (jobTitle) {
      prompt += `

【招聘职位】: ${jobTitle}`
    }

    if (jobRequirements) {
      prompt += `

【职位要求】: ${jobRequirements}`
    }

    prompt += `

【重要规则】
1. 从雇主的角度分析候选人是否适合该职位
2. 只回答与简历、职位匹配、招聘相关的问题
3. 如果用户询问无关话题，礼貌地拒绝并引导回到招聘相关话题
4. 回答要简洁、专业、有说服力
5. 根据职位要求突出候选人相关的技能和经验
6. 如果用户问"为什么这个候选人适合"，重点说明技能、经验和职位要求的匹配度
7. 使用项目符号列出要点，让回答更易读`

    return prompt
  }

  let prompt = `You are a professional hiring assistant helping employers evaluate how well a candidate's resume matches a position. Your task is to answer questions based on the candidate's resume and the hiring position provided by the employer.

【CANDIDATE RESUME】
${formattedResume}`

  if (jobTitle) {
    prompt += `

【HIRING POSITION】: ${jobTitle}`
  }

  if (jobRequirements) {
    prompt += `

【JOB REQUIREMENTS】: ${jobRequirements}`
  }

  prompt += `

【IMPORTANT RULES】
1. Analyze the candidate's fit from the employer's perspective
2. Only answer questions related to the resume, job matching, and hiring
3. If the user asks unrelated questions, politely decline and guide back to hiring topics
4. Keep responses concise, professional, and persuasive
5. Highlight relevant skills and experience from the resume that match job requirements
6. If the user asks "Why is this candidate a good fit", focus on matching skills, experience, and requirements
7. Use bullet points to make responses easier to read`

  return prompt
}

export async function onRequestPost(context) {
  const { request, env } = context

  if (!env.DEEPSEEK_API_KEY || env.DEEPSEEK_API_KEY === 'your_deepseek_api_key_here') {
    return new Response(JSON.stringify({ error: 'Deepseek API not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { message, history, resumeData, jobTitle, jobRequirements, language } = body

  const systemPrompt = buildSystemPrompt(resumeData, jobTitle, jobRequirements, language)
  const apiMessages = [{ role: 'system', content: systemPrompt }]

  if (Array.isArray(history)) {
    for (const msg of history) {
      if (msg && (msg.role === 'user' || msg.role === 'assistant') && typeof msg.content === 'string') {
        apiMessages.push({ role: msg.role, content: msg.content })
      }
    }
  }

  if (typeof message === 'string' && message.trim()) {
    // Ensure the latest user turn is included (defensive — caller already appends it)
    const last = apiMessages[apiMessages.length - 1]
    if (!last || last.role !== 'user' || last.content !== message) {
      apiMessages.push({ role: 'user', content: message })
    }
  }

  const deepseekUrl = `${env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1'}/chat/completions`

  let upstream
  try {
    upstream = await fetch(deepseekUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      }),
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to reach Deepseek', details: err.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => '')
    return new Response(JSON.stringify({ error: 'Deepseek API error', status: upstream.status, details: text.slice(0, 500) }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Parse SSE chunks from Deepseek and forward only the content deltas as plain text.
  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body.getReader()
      const decoder = new TextDecoder()
      const encoder = new TextEncoder()
      let buffer = ''

      try {
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })

          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed.startsWith('data:')) continue
            const data = trimmed.slice(5).trim()
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const delta = parsed.choices?.[0]?.delta?.content
              if (delta) controller.enqueue(encoder.encode(delta))
            } catch {
              // Skip malformed SSE lines
            }
          }
        }
      } catch (err) {
        controller.error(err)
        return
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  })
}
