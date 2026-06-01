import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useId } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { resumeData } from '../data/resume'
import { resumeDataZh } from '../data/resumeZh'

// Default to same-origin (works for both Cloudflare Pages Functions and Vite dev proxy).
// Override via VITE_API_BASE_URL only if the backend is hosted elsewhere.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

// Message types
const MESSAGE_TYPES = {
  GREETING: 'greeting',
  JOB_TITLE: 'job_title',
  JOB_REQUIREMENTS: 'job_requirements',
  CHAT: 'chat'
}

export default function AIAnswer() {
  const { language } = useLanguage()
  const data = language === 'zh' ? resumeDataZh : resumeData

  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [conversationState, setConversationState] = useState(MESSAGE_TYPES.GREETING)
  const [collectedInfo, setCollectedInfo] = useState({ jobTitle: '', jobRequirements: '' })

  const inputRef = useRef(null)
  const inputId = useId()
  const typingTimerRef = useRef(null)
  const lastMessageCount = useRef(0)
  const messagesContainerRef = useRef(null)
  const abortControllerRef = useRef(null)
  const hasUserInteractedRef = useRef(false)

  const t = {
    title: language === 'zh' ? 'AI 助手' : 'AI Assistant',
    subtitle: language === 'zh' ? '帮我分析这份简历与职位的匹配度' : 'Help me analyze how well this resume matches your position',
    placeholder: language === 'zh' ? '输入你的回答...' : 'Type your response...',
    sending: language === 'zh' ? '发送中...' : 'Sending...',
    thinking: language === 'zh' ? '正在思考...' : 'Thinking...',
    greeting: language === 'zh'
      ? `你好！我是${data.name}的AI助手。我可以帮你分析这份简历与你招聘职位的匹配度。首先，请问你想招聘什么职位？`
      : `Hello! I'm ${data.name}'s AI assistant. I can help you analyze how well this resume matches your hiring position. First, what position are you looking to hire for?`,
    askRequirements: (jobTitle) => language === 'zh'
      ? `很好！了解您在招聘"${jobTitle}"。接下来，请告诉我这个职位的要求是什么？（比如需要什么技能、经验、学历等）`
      : `Great! I see you're hiring for "${jobTitle}". Next, what are the requirements for this position? (e.g., skills, experience, education)`,
    readyToChat: language === 'zh'
      ? `谢谢你！现在你可以问我关于这份简历的任何问题，比如：
• 为什么${data.name}适合这个职位？
• ${data.name}有哪些相关经验？
• ${data.name}掌握哪些技能？`
      : `Thank you! Now you can ask me anything about this resume, such as:
• Why is ${data.name} a good fit for this position?
• What relevant experience does ${data.name} have?
• What skills does ${data.name} possess?`,
    notJobRelated: language === 'zh'
      ? '抱歉，我只能回答与这份简历和职位匹配相关的问题。请问有什么关于这份简历或职位的问题我可以帮你解答吗？'
      : 'Sorry, I can only answer questions related to this resume and job matching. Is there anything about this resume or the position I can help you with?',
    networkError: language === 'zh'
      ? '暂时连不上 AI 服务，请稍后再试。如果你是网站访问者，作者可能还没把后端部署上线。'
      : "Couldn't reach the AI service. Please try again later — the backend may not be deployed yet.",
    inputLabel: language === 'zh' ? '输入消息' : 'Type your message',
    messagesRegionLabel: language === 'zh' ? 'AI 对话消息' : 'AI conversation messages',
    exampleQuestions: language === 'zh' ? [
      `为什么${data.name}适合这个职位？`,
      `${data.name}有哪些相关经验？`,
      `${data.name}的技术能力如何？`
    ] : [
      `Why is ${data.name} a good fit?`,
      `What relevant experience does ${data.name} have?`,
      `How strong are ${data.name}'s technical skills?`
    ]
  }

  // Initialize conversation
  useEffect(() => {
    setMessages([
      { role: 'assistant', content: t.greeting, type: MESSAGE_TYPES.GREETING, isComplete: true }
    ])
    lastMessageCount.current = 1
  }, [language])

  // Auto-scroll to bottom - only scroll when new messages are added, not during typing
  useEffect(() => {
    const container = messagesContainerRef.current
    const newMessageCount = messages.length

    // Only scroll when a new message is added (not during typing animation)
    if (container && newMessageCount > lastMessageCount.current) {
      lastMessageCount.current = newMessageCount
      setTimeout(() => {
        container.scrollTop = container.scrollHeight
      }, 50)
    }
  }, [messages])

  // Re-focus input ONLY after a user-initiated turn completes; never on initial mount
  useEffect(() => {
    if (hasUserInteractedRef.current && !isLoading && !isTyping) {
      inputRef.current?.focus()
    }
  }, [isLoading, isTyping])

  // Typing animation effect - batch updates to minimize re-renders
  const startTypingAnimation = (text, messageId) => {
    setIsTyping(true)
    let index = 0
    const speed = 8 // Faster typing for smoother experience
    let accumulatedContent = ''

    const type = () => {
      if (index < text.length) {
        accumulatedContent += text[index]
        index++

        // Batch multiple characters together for smoother animation
        if (index % 3 === 0 || index === text.length) {
          setMessages(prev => prev.map(msg => {
            if (msg.id === messageId) {
              return { ...msg, content: accumulatedContent }
            }
            return msg
          }))
        }

        typingTimerRef.current = setTimeout(type, speed)
      } else {
        // Mark as complete without triggering state change that could cause scroll
        setMessages(prev => prev.map(msg => {
          if (msg.id === messageId) {
            return { ...msg, isComplete: true }
          }
          return msg
        }))
        // Small delay before clearing typing state
        setTimeout(() => {
          if (typingTimerRef.current) {
            clearTimeout(typingTimerRef.current)
          }
          setIsTyping(false)
        }, 50)
      }
    }
    type()
  }

  const addMessage = (role, content, type = MESSAGE_TYPES.CHAT) => {
    const id = Date.now() + Math.random()
    setMessages(prev => [...prev, { role, content, type, id, isComplete: true }])
    return id
  }

  const addStreamingMessage = () => {
    const id = Date.now() + Math.random()
    setMessages(prev => [...prev, { role: 'assistant', content: '', type: MESSAGE_TYPES.CHAT, id, isComplete: false, isStreaming: true }])
    return id
  }

  const updateStreamingMessage = (id, content) => {
    // Use requestAnimationFrame to batch updates during streaming
    requestAnimationFrame(() => {
      setMessages(prev => prev.map(msg => {
        if (msg.id === id) {
          return { ...msg, content }
        }
        return msg
      }))
    })
  }

  const completeStreamingMessage = (id, content) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === id) {
        return { ...msg, content, isComplete: true, isStreaming: false }
      }
      return msg
    }))

    // Scroll to bottom after streaming is complete, before typing animation
    setTimeout(() => {
      const container = messagesContainerRef.current
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    }, 100)
  }

  const getStreamingResponse = async (userMessage, history) => {
    abortControllerRef.current?.abort()
    const controller = new AbortController()
    abortControllerRef.current = controller

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: userMessage,
          history: history,
          resumeData: data,
          jobTitle: collectedInfo.jobTitle,
          jobRequirements: collectedInfo.jobRequirements,
          language,
          conversationState
        })
      })

      if (!response.ok) {
        const err = new Error('API request failed')
        err.code = 'API_ERROR'
        throw err
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullResponse = ''
      const messageId = addStreamingMessage()

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        fullResponse += chunk
        updateStreamingMessage(messageId, fullResponse)
      }

      // Complete streaming and start typing animation smoothly
      completeStreamingMessage(messageId, fullResponse)

      // Small delay before typing animation to avoid jumpy transition
      await new Promise(resolve => setTimeout(resolve, 150))
      startTypingAnimation(fullResponse, messageId)

      return fullResponse
    } catch (error) {
      if (error.name === 'AbortError') return
      if (import.meta.env.DEV) console.error('Streaming error:', error)
      // Tag network-style failures so the caller can show a clearer message
      if (!error.code) error.code = 'NETWORK_ERROR'
      throw error
    }
  }

  const handleSendMessage = async () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isLoading) return

    hasUserInteractedRef.current = true

    // Add user message
    addMessage('user', trimmed)
    setInputValue('')
    setIsLoading(true)

    try {
      // Handle conversation flow
      if (conversationState === MESSAGE_TYPES.GREETING) {
        // Employer provided position they're hiring for
        setCollectedInfo(prev => ({ ...prev, jobTitle: trimmed }))
        setConversationState(MESSAGE_TYPES.JOB_REQUIREMENTS)
        const msgId = addMessage('assistant', t.askRequirements(trimmed), MESSAGE_TYPES.JOB_REQUIREMENTS)
        startTypingAnimation(t.askRequirements(trimmed), msgId)
      } else if (conversationState === MESSAGE_TYPES.JOB_REQUIREMENTS) {
        // Employer provided job requirements
        setCollectedInfo(prev => ({ ...prev, jobRequirements: trimmed }))
        setConversationState(MESSAGE_TYPES.CHAT)

        // Send to backend for initial analysis
        const analysisPrompt = language === 'zh'
          ? `请分析为什么${data.name}适合"${collectedInfo.jobTitle}"这个职位（${trimmed}）`
          : `Please analyze why ${data.name} is a good fit for the "${collectedInfo.jobTitle}" position (${trimmed})`
        await getStreamingResponse(analysisPrompt, messages)
      } else {
        // Chat mode - send to backend
        await getStreamingResponse(trimmed, messages)
      }
    } catch (error) {
      // Distinguish network/API failure from anything else so users know the chat is unreachable
      const message = error.code === 'NETWORK_ERROR' || error.code === 'API_ERROR'
        ? t.networkError
        : t.notJobRelated
      addMessage('assistant', message, MESSAGE_TYPES.CHAT)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      e.stopPropagation()
      handleSendMessage()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    handleSendMessage()
  }

  const handleExampleClick = (question) => {
    setInputValue(question)
    inputRef.current?.focus()
  }

  // Clean up typing timer + abort in-flight requests on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current)
      }
      abortControllerRef.current?.abort()
    }
  }, [])

  // Cancel in-flight requests when language changes mid-stream
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [language])

  return (
    <section id="ai-answer" className="py-24 px-6 relative overflow-hidden">
      {/* Background effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          borderRadius: ['30%', '50%', '30%']
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-aurora-purple/20 to-aurora-pink/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
          borderRadius: ['50%', '30%', '50%']
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-aurora-cyan/20 to-aurora-blue/20 blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t.title}</span>
          </h2>
          <p className="text-slate-400">{t.subtitle}</p>
        </motion.div>

        {/* Chat Container - Responsive height with flex column layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-0 gradient-border overflow-hidden flex flex-col h-[min(650px,75vh)] min-h-[420px]"
        >
          {/* Messages Area - Flex grow, scrolls within */}
          <div
            ref={messagesContainerRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-label={t.messagesRegionLabel}
            className="flex-1 overflow-y-auto p-6 space-y-4"
            style={{ scrollBehavior: 'auto' }}
          >
            <AnimatePresence mode="popLayout">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  layout
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-aurora-purple to-aurora-pink text-white'
                      : 'bg-white/10 text-slate-200'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="text-sm"
                        >
                          🤖
                        </motion.span>
                        <span className="text-xs text-slate-400">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </p>

                    {/* Thinking indicator */}
                    {isLoading && msg.role === 'assistant' && msg.isStreaming && !msg.content && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-slate-400">{t.thinking}</span>
                        <div className="flex gap-1">
                          <motion.span
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 bg-aurora-cyan rounded-full"
                          />
                          <motion.span
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-aurora-purple rounded-full"
                          />
                          <motion.span
                            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-aurora-pink rounded-full"
                          />
                        </div>
                      </div>
                    )}

                    {/* Typing cursor */}
                    {isTyping && msg.role === 'assistant' && !msg.isComplete && msg.content && (
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-1.5 h-4 bg-aurora-cyan ml-1 align-middle"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Example Questions (only show in chat mode) */}
          {conversationState === MESSAGE_TYPES.CHAT && !isLoading && !isTyping && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 py-2 border-t border-white/5"
            >
              <p className="text-xs text-slate-400 mb-2">
                {language === 'zh' ? '示例问题：' : 'Example questions:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.exampleQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExampleClick(question)}
                    className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 text-xs transition-colors hover:text-slate-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Input Area */}
          <div className="border-t border-white/10 p-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <label htmlFor={inputId} className="sr-only">{t.inputLabel}</label>
              <input
                ref={inputRef}
                id={inputId}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.placeholder}
                disabled={isLoading || isTyping}
                autoComplete="off"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-aurora-purple/50 transition-colors disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={isLoading || isTyping || !inputValue.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-aurora-purple to-aurora-pink text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: (isLoading || isTyping || !inputValue.trim()) ? 1 : 1.05 }}
                whileTap={{ scale: (isLoading || isTyping || !inputValue.trim()) ? 1 : 0.95 }}
              >
                {isLoading ? t.sending : (language === 'zh' ? '发送' : 'Send')}
              </motion.button>
            </form>

            {/* Collected Info Display */}
            {(collectedInfo.jobTitle || collectedInfo.jobRequirements) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {collectedInfo.jobTitle && (
                  <div className="px-3 py-1 rounded-full bg-aurora-purple/20 text-aurora-purple text-xs">
                    {language === 'zh' ? '招聘职位：' : 'Hiring for: '}{collectedInfo.jobTitle}
                  </div>
                )}
                {collectedInfo.jobRequirements && (
                  <div className="px-3 py-1 rounded-full bg-aurora-cyan/20 text-aurora-cyan text-xs max-w-[300px]">
                    {language === 'zh' ? '职位要求：' : 'Requirements: '}{collectedInfo.jobRequirements}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
