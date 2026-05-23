import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3002
const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1'
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY

// Middleware
app.use(cors())
app.use(express.json({ limit: '1mb' }))

// Validate API key on startup
if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === 'your_deepseek_api_key_here') {
  console.warn('WARNING: DEEPSEEK_API_KEY not configured in .env file')
}

// Helper function to format resume data for prompt
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
  } catch (error) {
    console.error('Error formatting resume:', error)
    return `NAME: ${resume?.name || 'Candidate'}
Resume data format error`
  }
}

// Build system prompt based on conversation state
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
  } else {
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
}

// Chat endpoint with streaming support
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, resumeData, jobTitle, jobRequirements, language } = req.body

    console.log('Chat request:', { message, jobTitle })

    // Validate API key
    if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === 'your_deepseek_api_key_here') {
      return res.status(500).json({ error: 'Deepseek API not configured' })
    }

    // Build messages for API
    const systemPrompt = buildSystemPrompt(resumeData, jobTitle, jobRequirements, language)

    // Convert history to API format
    const apiMessages = [
      { role: 'system', content: systemPrompt }
    ]

    // Add conversation history
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          apiMessages.push({
            role: msg.role,
            content: msg.content
          })
        }
      }
    }

    console.log('Calling Deepseek API...')

    // Call Deepseek API with streaming
    const response = await axios.post(
      `${DEEPSEEK_API_URL}/chat/completions`,
      {
        model: 'deepseek-chat',
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: true
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        },
        responseType: 'stream'
      }
    )

    // Set headers for streaming response
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Transfer-Encoding', 'chunked')

    // Pipe the stream to the client
    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n').filter(line => line.trim() !== '')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6)
          if (data === '[DONE]') continue

          try {
            const parsed = JSON.parse(data)
            const content = parsed.choices[0]?.delta?.content
            if (content) {
              res.write(content)
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    })

    response.data.on('end', () => {
      res.end()
    })

    response.data.on('error', (err) => {
      console.error('Stream error:', err)
      res.end()
    })

  } catch (error) {
    console.error('Chat error:', error)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to process chat', details: error.message })
    }
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', apiConfigured: !!DEEPSEEK_API_KEY && DEEPSEEK_API_KEY !== 'your_deepseek_api_key_here' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Deepseek API ${DEEPSEEK_API_KEY && DEEPSEEK_API_KEY !== 'your_deepseek_api_key_here' ? 'configured' : 'NOT configured'}`)
})
