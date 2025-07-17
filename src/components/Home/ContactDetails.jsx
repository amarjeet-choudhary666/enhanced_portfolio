import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from "@emailjs/browser";

const ContactDetails = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [activeField, setActiveField] = useState(null)
  const form = useRef()

  const particles = [
    { icon: "💻", size: "text-xl", delay: 0 },
    { icon: "✨", size: "text-2xl", delay: 0.5 },
    { icon: "🚀", size: "text-lg", delay: 1 },
    { icon: "👨‍💻", size: "text-xl", delay: 1.5 },
    { icon: "🔮", size: "text-2xl", delay: 2 },
    { icon: "🎨", size: "text-lg", delay: 2.5 },
    { icon: "📱", size: "text-xl", delay: 3 },
    { icon: "🌌", size: "text-2xl", delay: 3.5 },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('contact-section')
      if (element) {
        const position = element.getBoundingClientRect()
        if (position.top < window.innerHeight - 100) {
          setIsVisible(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  const fieldVariants = {
    inactive: { 
      y: 0,
      transition: { type: "spring", damping: 15 }
    },
    active: { 
      y: -5,
      transition: { type: "spring", damping: 15 }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await emailjs.sendForm(
        'service_y8pjhld', 
        'template_4pw8vn9', 
        form.current, 
        'DRzrGp01XHDINJptR'
      )
      setSubmitStatus('success')
      setShowPopup(true)
      setFormData({ from_name: '', from_email: '', message: '' })
    } catch (error) {
      console.error(error)
      setSubmitStatus('error')
      setShowPopup(true)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setSubmitStatus(null)
      }, 3000)
    }
  }

  return (
    <div id="contact-section" className="min-h-screen font-winky flex items-center justify-center bg-gradient-to-br from-[#0a0e1a] via-[#1a1f3a] to-[#0a0e1a] relative overflow-hidden isolate">
      {/* Animated grid background */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute ${particle.size} text-white/30`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ 
            y: 0,
            x: 0,
            opacity: 0
          }}
          animate={{ 
            y: [0, -100, -200, -300],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0, 1, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            delay: particle.delay,
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "linear"
          }}
        >
          {particle.icon}
        </motion.div>
      ))}

      {/* Glowing orb */}
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-blue-500/10 filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-purple-500/10 filter blur-3xl opacity-20 animate-pulse"></div>

      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={formVariants}
        className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-2xl p-12 rounded-3xl shadow-2xl w-full max-w-4xl mx-4 border border-gray-700/50 relative overflow-hidden"
      >
        {/* Decorative border animation */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl -z-10">
          <motion.div 
            className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#8b5cf6_50%,#3b82f6_100%)] opacity-20"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Left side - Contact info */}
          <div className="md:w-2/5 space-y-8">
            <div className="space-y-4">
              <motion.h2 
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Let's Connect
              </motion.h2>
              <motion.p 
                className="text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
              </motion.p>
            </div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm">Email</h4>
                  <p className="text-white">amarjeetchoudhary647@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm">Phone</h4>
                  <p className="text-white">+91 9810747614</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm">Location</h4>
                  <p className="text-white">Delhi, India</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h4 className="text-gray-400 text-sm mb-3">Follow me</h4>
              <div className="flex gap-3">
                {['twitter', 'github', 'linkedin', 'dribbble'].map((social, i) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 hover:border-gray-600"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <use href={`#${social}-icon`} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - Form */}
          <div className="md:w-3/5">
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="relative"
                variants={fieldVariants}
                animate={activeField === 'name' ? 'active' : 'inactive'}
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField(null)}
              >
                <label htmlFor="from_name" className="block text-sm font-medium text-gray-400 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 border border-gray-700 hover:border-blue-400/50 backdrop-blur-sm"
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: activeField === 'name' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              <motion.div 
                className="relative"
                variants={fieldVariants}
                animate={activeField === 'email' ? 'active' : 'inactive'}
                onFocus={() => setActiveField('email')}
                onBlur={() => setActiveField(null)}
              >
                <label htmlFor="from_email" className="block text-sm font-medium text-gray-400 mb-1">
                  Your Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="from_email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 border border-gray-700 hover:border-blue-400/50 backdrop-blur-sm"
                  />
                  <motion.div 
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: activeField === 'email' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              <motion.div 
                className="relative"
                variants={fieldVariants}
                animate={activeField === 'message' ? 'active' : 'inactive'}
                onFocus={() => setActiveField('message')}
                onBlur={() => setActiveField(null)}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full bg-gray-800/50 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 border border-gray-700 hover:border-blue-400/50 backdrop-blur-sm"
                  ></textarea>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ width: 0 }}
                    animate={{ width: activeField === 'message' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
                  backgroundPosition: "100% 50%"
                }}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-gradient-to-r from-blue-500 to-indigo-500 bg-size-200 text-white p-4 rounded-lg transition-all duration-500 font-medium text-lg shadow-lg hover:shadow-blue-500/25 relative overflow-hidden group`}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </form>
          </div>
        </div>

        {/* Success/Error Popup */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowPopup(false)}
            >
              <motion.div 
                className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700/50 w-full max-w-md relative overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full filter blur-xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full filter blur-xl"></div>
                
                <div className="relative z-10 text-center">
                  <motion.div 
                    className="mx-auto w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring" }}
                  >
                    {submitStatus === 'success' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {submitStatus === 'success' ? 'Message Sent!' : 'Error Occurred'}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {submitStatus === 'success' 
                      ? "Thank you for reaching out! I'll get back to you as soon as possible." 
                      : "There was an issue sending your message. Please try again later."}
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPopup(false)}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium shadow-lg"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <symbol id="twitter-icon" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </symbol>
        <symbol id="github-icon" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </symbol>
        <symbol id="linkedin-icon" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" clipRule="evenodd" />
        </symbol>
        <symbol id="dribbble-icon" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
        </symbol>
      </svg>
    </div>
  )
}

export default ContactDetails