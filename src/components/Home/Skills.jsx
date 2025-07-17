import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Skills = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [hoveredSkill, setHoveredSkill] = useState(null)

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('skills-section')
            if (element) {
                const position = element.getBoundingClientRect()
                if (position.top < window.innerHeight - 100) {
                    setIsVisible(true)
                }
            }
        }

        // Trigger once on mount
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const skillsData = [
        {
            category: "Frontend",
            color: "from-cyan-400 to-blue-600",
            skills: [
                { name: "React.js", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                { name: "JavaScript", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                { name: "HTML5", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                { name: "CSS3", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
                { name: "Tailwind CSS", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
                { name: "Next.js", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                {name: "Golang", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg"}
            ]
        },
        {
            category: "Backend",
            color: "from-purple-400 to-indigo-600",
            skills: [
                { name: "Node.js", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                { name: "Express.js", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
                { name: "MongoDB", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
                { name: "REST API", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                {name: "Nestjs", level: 60, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg"},
                {name: "Postgresql", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg"},
                {name: "MongoDB", level: "80", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"}
            ]
        },
        {
            category: "Tools & More",
            color: "from-pink-400 to-rose-600",
            skills: [
                { name: "Git", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                { name: "Docker", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                { name: "Linux", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
                { name: "AWS", level: 65, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
                {name: "Cloudinary", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudinary/cloudinary-original.svg" },
            ]
        }
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
        hidden: { y: 40, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                duration: 0.5
            }
        }
    }

    const skillBarVariants = {
        hidden: { width: 0 },
        visible: (level) => ({
            width: `${level}%`,
            transition: {
                duration: 1.5,
                delay: 0.5,
                type: "spring",
                damping: 10
            }
        })
    }

    return (
        <div id="skills-section" className="min-h-screen font-winky flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-10 sm:py-20 relative overflow-hidden">
            
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                        initial={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 200 + 100}px`,
                            height: `${Math.random() * 200 + 100}px`,
                            opacity: 0
                        }}
                        animate={{
                            opacity: [0, 0.15, 0],
                            scale: [1, 1.3, 1]
                        }}
                        transition={{
                            duration: Math.random() * 15 + 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={containerVariants}
                className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            >
                <motion.div 
                    className="text-center mb-16"
                    variants={itemVariants}
                >
                    <motion.h2 
                        className="text-sm sm:text-base md:text-lg font-semibold font-winky tracking-widest text-cyan-400 mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        MY EXPERTISE
                    </motion.h2>
                    <motion.h1 
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent font-w">
                            Skills &
                        </span>{" "}
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-500 bg-clip-text text-transparent">
                            Abilities
                        </span>
                    </motion.h1>
                    <motion.div 
                        className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={isVisible ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                    {skillsData.map((category, idx) => (
                        <motion.div 
                            key={idx}
                            variants={itemVariants}
                            className={`bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 hover:border-${category.color.split(' ')[1].replace('to-', '')}/50 transition-all duration-500 hover:shadow-lg`}
                            whileHover={{ 
                                y: -10,
                                boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`
                            }}
                            onMouseEnter={() => setHoveredSkill(idx)}
                            onMouseLeave={() => setHoveredSkill(null)}
                        >
                            <div className="relative overflow-hidden rounded-lg mb-6">
                                <motion.div 
                                    className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-30`}
                                    animate={{
                                        backgroundPosition: hoveredSkill === idx ? ['0% 50%', '100% 50%'] : '0% 50%'
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                />
                                <motion.h2 
                                    className={`text-2xl sm:text-3xl font-bold py-4 text-center relative z-10 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {category.category}
                                </motion.h2>
                            </div>
                            
                            <div className="space-y-5">
                                {category.skills.map((skill, index) => (
                                    <motion.div 
                                        key={index}
                                        className="relative group"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        whileHover={{ 
                                            scale: 1.02,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <div className="flex items-center mb-2">
                                            <motion.div 
                                                className="flex items-center justify-center p-2 rounded-lg bg-gray-700/50 mr-3"
                                                whileHover={{ 
                                                    rotate: 15,
                                                    scale: 1.1,
                                                    backgroundColor: 'rgba(99, 102, 241, 0.3)'
                                                }}
                                            >
                                                <motion.img 
                                                    src={skill.icon} 
                                                    alt={skill.name} 
                                                    className="w-6 h-6 sm:w-8 sm:h-8"
                                                    whileHover={{ rotate: 360 }}
                                                    transition={{ duration: 0.8 }}
                                                />
                                            </motion.div>
                                            <span className="text-lg sm:text-xl font-medium text-gray-200 group-hover:text-white transition-colors duration-300">
                                                {skill.name}
                                            </span>
                                            <motion.span 
                                                className="ml-auto text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 1 + index * 0.1 }}
                                            >
                                                {skill.level}%
                                            </motion.span>
                                        </div>
                                        <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                                            <motion.div
                                                custom={skill.level}
                                                variants={skillBarVariants}
                                                initial="hidden"
                                                animate="visible"
                                                className={`h-full bg-gradient-to-r ${category.color} relative`}
                                                whileHover={{ 
                                                    scaleY: 1.5,
                                                    originY: 1
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default Skills
