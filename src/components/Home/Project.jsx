import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiStar, FiGitBranch, FiEye, FiCode, FiZap, FiTrendingUp } from 'react-icons/fi'
import screenshot from '../../assets/Screenshot.png'

const Project = () => {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform like geer.in",
      description: "A modern E-Commerce Platform inspired by Geer.in, built with the MERN stack. This platform enables secure shopping experiences with a robust backend architecture and is currently under active frontend development.",
      image: `${screenshot}`,
      technologies: ["React", "Node.js", "MongoDB", "Next.js", "JWT", "bcrypt", "Cloudinary", "Express"],
      githubLink: "https://github.com/amarjeet-choudhary666/e-commerce-like-geer.in-platform",
      liveLink: "#",
      stars: 128,
      forks: 42,
      category: "fullstack",
      status: "completed",
      gradient: "from-emerald-400 via-cyan-400 to-blue-500"
    },
    {
      id: 2,
      title: "AI Task Management Todo App", 
      description: "An intelligent and intuitive AI-powered Todo App designed to enhance productivity and streamline daily task management. This app blends modern frontend design with smart backend automation using AI to help users not just manage tasks, but complete them smarter and faster with Gemini integration.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      technologies: ["Next.js", "PostgreSQL", "Tailwind", "Drizzle", "TypeScript", "Clerk", "Node.js", "Express"],
      githubLink: "https://github.com/amarjeet-choudhary666/full_stack_ai_task_manager",
      liveLink: "#",
      stars: 89,
      forks: 31,
      category: "ai",
      status: "completed",
      gradient: "from-purple-400 via-pink-400 to-red-400"
    },
    {
      id: 3,
      title: "Leaderboard Task Project",
      description: "A real-time Leaderboard Application where users compete by claiming points, and rankings update live. Designed for speed, interactivity, and dynamic data handling, this app simulates a gamified environment ideal for coding challenges, competitions, or engagement-based platforms.", 
      image: "https://slideuplift.com/wp-content/uploads/1970/01/Leaderboard-PowerPoint-Template-0944-768x576.jpg",
      technologies: ["React", "Express", "MongoDB", "Mongoose", "TypeScript", "WebSocket", "Node.js"],
      githubLink: "https://github.com/amarjeet-choudhary666/leaderboard_project",
      liveLink: "#",
      stars: 156,
      forks: 53,
      category: "realtime",
      status: "completed",
      gradient: "from-yellow-400 via-orange-400 to-red-500"
    },
    {
      id: 4,
      title: "CSV Data Distributor MERN Project",
      description: "CSV Data Distributor for Agents is a full-stack MERN application that allows admins to upload CSV files, map and manage the data, and automatically distribute rows to assigned agents based on rules or manual selection. Perfect for organizations that need to delegate structured data efficiently.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", 
      technologies: ["Nest.js", "MongoDB", "Mongoose", "React.js", "Node.js", "JWT", "Express", "Multer"],
      githubLink: "https://github.com/amarjeet-choudhary666/csv_mern_stack_project",
      liveLink: "#",
      stars: 210,
      forks: 78,
      category: "fullstack",
      status: "completed",
      gradient: "from-indigo-400 via-blue-400 to-cyan-400"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Projects', icon: FiCode },
    { id: 'fullstack', name: 'Full Stack', icon: FiZap },
    { id: 'ai', name: 'AI Powered', icon: FiTrendingUp },
    { id: 'realtime', name: 'Real-time', icon: FiEye }
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }

  return (
    <div id='project-section' className="min-h-screen font-winky bg-gradient-to-br from-gray-900 via-[#0a0e1a] to-black text-white py-20 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              background: `linear-gradient(45deg, 
                ${i % 3 === 0 ? '#3b82f6, #8b5cf6' : i % 3 === 1 ? '#06b6d4, #3b82f6' : '#8b5cf6, #ec4899'})`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FiCode className="text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Portfolio Showcase</span>
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Explore my collection of innovative web applications, each crafted with cutting-edge technologies 
            and designed to solve real-world problems with elegant solutions.
          </motion.p>

          {/* Animated Divider */}
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-16"
          variants={itemVariants}
        >
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + categories.indexOf(category) * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </div>
                
                {selectedCategory === category.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-2xl"
                    layoutId="activeCategory"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>
        
        {/* Enhanced Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 border border-gray-700/50 hover:border-blue-400/30"
                style={{ perspective: '1000px' }}
                whileHover={{ 
                  y: -15,
                  rotateX: 5,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Gradient Border Animation */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}
                  animate={{
                    background: [
                      `linear-gradient(0deg, ${project.gradient.split(' ').join(', ')})`,
                      `linear-gradient(90deg, ${project.gradient.split(' ').join(', ')})`,
                      `linear-gradient(180deg, ${project.gradient.split(' ').join(', ')})`,
                      `linear-gradient(270deg, ${project.gradient.split(' ').join(', ')})`,
                      `linear-gradient(360deg, ${project.gradient.split(' ').join(', ')})`
                    ]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Project Image with Enhanced Effects */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{
                      scale: hoveredProject === index ? 1.15 : 1.1,
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  
                  {/* Multi-layer Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  {/* Floating Status Badge */}
                  <motion.div
                    className="absolute top-4 right-4 px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    ✨ {project.status}
                  </motion.div>

                  {/* Hover Overlay with Quick Actions */}
                  <motion.div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiGithub className="w-6 h-6 text-white" />
                    </motion.a>
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiExternalLink className="w-6 h-6 text-white" />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Enhanced Content Section */}
                <div className="p-8">
                  {/* Header with Stats */}
                  <div className="flex justify-between items-start mb-4">
                    <motion.h3 
                      className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {project.title}
                    </motion.h3>
                    
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="flex items-center gap-1 text-sm text-yellow-400"
                        whileHover={{ scale: 1.1 }}
                      >
                        <FiStar className="w-4 h-4" />
                        <span className="font-semibold">{project.stars}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-1 text-sm text-blue-400"
                        whileHover={{ scale: 1.1 }}
                      >
                        <FiGitBranch className="w-4 h-4" />
                        <span className="font-semibold">{project.forks}</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Description */}
                  <motion.p 
                    className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Enhanced Technologies */}
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {project.technologies.slice(0, 6).map((tech, i) => (
                      <motion.span 
                        key={i}
                        className={`px-3 py-1 bg-gradient-to-r ${project.gradient} bg-opacity-10 border border-current/20 rounded-full text-xs sm:text-sm font-medium`}
                        style={{ 
                          background: `linear-gradient(135deg, ${project.gradient.split(' ').slice(1, 3).join(', ')})`,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          borderColor: project.gradient.includes('blue') ? '#3b82f6' : project.gradient.includes('purple') ? '#8b5cf6' : '#06b6d4'
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                          transition: { type: "spring", stiffness: 400 }
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 6 && (
                      <motion.span 
                        className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-400 font-medium"
                        whileHover={{ scale: 1.05 }}
                      >
                        +{project.technologies.length - 6} more
                      </motion.span>
                    )}
                  </motion.div>

                  {/* Enhanced Action Buttons */}
                  <motion.div
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${project.gradient} rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiGithub className="w-4 h-4" />
                      <span>View Code</span>
                    </motion.a>
                    
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gray-800/80 hover:bg-gray-700/80 rounded-xl text-gray-300 hover:text-white font-semibold transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50"
                      whileHover={{ 
                        scale: 1.02,
                        y: -2
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiExternalLink className="w-4 h-4" />
                    </motion.a>
                  </motion.div>
                </div>

                {/* Animated Corner Accent */}
                <motion.div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${project.gradient} opacity-10 rounded-bl-3xl`}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced CTA Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block p-8 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to see more of my work?
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Explore my complete portfolio on GitHub with 50+ repositories and counting!
            </p>
            
            <motion.a
              href="https://github.com/amarjeet-choudhary666?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(139, 92, 246, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <FiGithub className="w-5 h-5" />
              <span>View All Projects</span>
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FiExternalLink className="w-5 h-5" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Project