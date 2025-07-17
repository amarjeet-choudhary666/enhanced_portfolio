import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiStar, FiGitBranch } from 'react-icons/fi'
import screenshot from '../../assets/Screenshot.png'

const Project = () => {
  const [hoveredProject, setHoveredProject] = useState(null)

  const projects = [
    {
      title: "E-Commerce Platform like geer.in",
      description: "A modern E-Commerce Platform inspired by Geer.in, built with the MERN stack. This platform enables secure shopping experiences with a robust backend architecture and is currently under active frontend development.",
      image: `${screenshot}`,
      technologies: ["React", "Node.js", "MongoDB", "Nextjs", "JsonwebToken", "bcrypt", "cloudinary", "cors", "Express", "Mongoose", "cooki-parser"],
      githubLink: "https://github.com/amarjeet-choudhary666/e-commerce-like-geer.in-platform",
      stars: 128,
      forks: 42
    },
    {
      title: "AI Task Management Todo  App", 
      description: "An intelligent and intuitive AI-powered Todo App designed to enhance productivity and streamline daily task management. This app blends modern frontend design with smart backend automation using AI to help users not just manage tasks, but complete them smarter and faster gemini integration.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      technologies: ["Nextjs", "postgresql", "Tailwind", "drizzle", "Typescript", "Clerk", "Nodejs", "Nodemon", "Express", "cookie-parser"],
      githubLink: "https://github.com/amarjeet-choudhary666/full_stack_ai_task_manager",
      stars: 89,
      forks: 31
    },
    {
      title: "Leaderboard task project",
      description: "A real-time Leaderboard Application where users compete by claiming points, and rankings update live. Designed for speed, interactivity, and dynamic data handling, this app simulates a gamified environment ideal for coding challenges, competitions, or engagement-based platforms.", 
      image: "https://slideuplift.com/wp-content/uploads/1970/01/Leaderboard-PowerPoint-Template-0944-768x576.jpg",
      technologies: ["React", "Express", "MongoDB", "mongoose", "Typescript", "Mongoose", "web-socket", "cooki-parser", "cors", "Nodejs", "Nodemon"],
      githubLink: "https://github.com/amarjeet-choudhary666/leaderboard_project",
      stars: 156,
      forks: 53
    },
    {
      title: "CSV Data distributer MERN full stack project",
      description: "CSV Data Distributor for Agents is a full-stack MERN application that allows admins to upload CSV files, map and manage the data, and automatically distribute rows to assigned agents based on rules or manual selection. It’s designed for organizations that need to delegate structured data (like leads, tickets, or tasks) efficiently to a team of agents.",
      image: "data:image/jpeg;base64,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", 
      technologies: ["Nestjs", "mongodb", "mongoose", "Reactjs", "Nodejs", "jsonwebtoken", "express", "cors", "multer", "bcrypt", "csv-parser", "nodemon"],
      githubLink: "https://github.com/amarjeet-choudhary666/csv_mern_stack_project",
      stars: 210,
      forks: 78
    },
    
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  }

  return (
    <div id='project-section' className="min-h-screen font-winky bg-gradient-to-br from-gray-900 via-[#0e1120] to-gray-900 text-white py-20 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5"
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              opacity: 0
            }}
            animate={{
              opacity: [0, 0.08, 0],
              scale: [1, 1.5, 2]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.div 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-sm sm:text-base font-semibold tracking-widest text-blue-400 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            MY WORK
          </motion.h2>
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Featured
            </span>{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative group bg-gray-800/30 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:shadow-blue-500/30 transition-all duration-500 border border-gray-700/50 hover:border-blue-400/30`}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project image with gradient overlay */}
              <div className="relative h-64 overflow-hidden">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{
                    scale: hoveredProject === index ? 1.05 : 1,
                    transition: { duration: 0.8 }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-4">
                  <motion.h3 
                    className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                    whileHover={{ x: 5 }}
                  >
                    {project.title}
                  </motion.h3>
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="flex items-center text-sm text-blue-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FiStar className="mr-1" /> {project.stars}
                    </motion.div>
                    <motion.div 
                      className="flex items-center text-sm text-purple-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FiGitBranch className="mr-1" /> {project.forks}
                    </motion.div>
                  </div>
                </div>

                <motion.p 
                  className="text-gray-300 mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {project.description}
                </motion.p>

                {/* Technologies */}
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {project.technologies.map((tech, i) => (
                    <motion.span 
                      key={i}
                      className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs sm:text-sm font-medium text-blue-300"
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: 'rgba(99, 102, 241, 0.2)'
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                {/* GitHub button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 0 25px rgba(99, 102, 241, 0.3)",
                      backgroundColor: 'rgba(99, 102, 241, 0.8)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center px-6 py-3 bg-blue-500/70 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg"
                  >
                    <FiGithub className="mr-2" />
                    View on GitHub
                    <motion.div 
                      className="ml-2"
                      animate={{
                        x: [0, 5, 0],
                        transition: {
                          repeat: Infinity,
                          duration: 1.5,
                          delay: 1
                        }
                      }}
                    >
                      <FiExternalLink />
                    </motion.div>
                  </motion.a>
                </motion.div>
              </div>

              {/* Hover effect border */}
              <motion.div 
                className="absolute inset-0 border-2 border-transparent pointer-events-none"
                animate={{
                  borderColor: hoveredProject === index ? 'rgba(99, 102, 241, 0.3)' : 'transparent',
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* View all projects button */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/amarjeet-choudhary666?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.05,
              background: 'linear-gradient(45deg, #6366f1, #8b5cf6, #d946ef)',
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-lg font-semibold shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
          >
            View All Projects
            <motion.svg 
              className="ml-2 w-5 h-5"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                x: [0, 5, 0],
                transition: {
                  repeat: Infinity,
                  duration: 1.5
                }
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Project