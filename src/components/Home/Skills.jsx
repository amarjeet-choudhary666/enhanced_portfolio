import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'

const Skills = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [hoveredSkill, setHoveredSkill] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [activeSkill, setActiveSkill] = useState(null)
    const controls = useAnimation()
    const containerRef = useRef(null)

    // Mouse tracking for 3D effects
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('skills-section')
            if (element) {
                const position = element.getBoundingClientRect()
                if (position.top < window.innerHeight - 100) {
                    setIsVisible(true)
                    controls.start("visible")
                }
            }
        }

        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect()
                const { clientX, clientY } = e
                const { innerWidth, innerHeight } = window

                setMousePosition({
                    x: (clientX / innerWidth) * 100,
                    y: (clientY / innerHeight) * 100
                })

                mouseX.set(clientX - rect.left - rect.width / 2)
                mouseY.set(clientY - rect.top - rect.height / 2)
            }
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [controls, mouseX, mouseY])

    const skillsData = [
        {
            category: "Frontend Mastery",
            emoji: "🎨",
            color: "from-cyan-400 via-blue-500 to-purple-600",
            bgGradient: "from-cyan-500/10 via-blue-500/10 to-purple-600/10",
            borderColor: "border-cyan-500/30",
            skills: [
                { name: "React.js", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", description: "Component-based UI library" },
                { name: "JavaScript", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", description: "Modern ES6+ features" },
                { name: "HTML5", level: 95, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", description: "Semantic markup expert" },
                { name: "CSS3", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", description: "Advanced animations & layouts" },
                { name: "Tailwind CSS", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", description: "Utility-first CSS framework" },
                { name: "Next.js", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", description: "Full-stack React framework" },
                { name: "TypeScript", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", description: "Type-safe JavaScript" }
            ]
        },
        {
            category: "Backend Power",
            emoji: "⚡",
            color: "from-purple-400 via-pink-500 to-red-600",
            bgGradient: "from-purple-500/10 via-pink-500/10 to-red-600/10",
            borderColor: "border-purple-500/30",
            skills: [
                { name: "Node.js", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", description: "Server-side JavaScript runtime" },
                { name: "Express.js", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", description: "Fast web framework" },
                { name: "MongoDB", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", description: "NoSQL database expert" },
                { name: "REST API", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", description: "RESTful service design" },
                { name: "NestJS", level: 60, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg", description: "Scalable Node.js framework" },
                { name: "PostgreSQL", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", description: "Advanced SQL database" },
                { name: "Golang", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg", description: "High-performance backend" }
            ]
        },
        {
            category: "DevOps & Tools",
            emoji: "🛠️",
            color: "from-green-400 via-emerald-500 to-teal-600",
            bgGradient: "from-green-500/10 via-emerald-500/10 to-teal-600/10",
            borderColor: "border-green-500/30",
            skills: [
                { name: "Git", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", description: "Version control mastery" },
                { name: "Docker", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", description: "Containerization expert" },
                { name: "Linux", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", description: "System administration" },
                { name: "AWS", level: 65, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", description: "Cloud infrastructure" },
                { name: "Cloudinary", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudinary/cloudinary-original.svg", description: "Media management" }
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
        <div
            ref={containerRef}
            id="skills-section"
            className="min-h-screen font-winky w-full text-white bg-gradient-to-br from-gray-900 via-black to-blue-900 py-20 relative overflow-hidden"
        >
            {/* Next-Level Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Dynamic Particle System */}
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                        }}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, Math.random() * 30 - 15, 0],
                            opacity: [0.1, 0.8, 0.1],
                            scale: [1, 2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 8,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut"
                        }}

                    />
                ))}

                {/* Interactive Mouse-Following Gradient */}
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(147,51,234,0.3) 30%, rgba(236,72,153,0.2) 60%, transparent 100%)',
                        left: `${mousePosition.x}%`,
                        top: `${mousePosition.y}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Floating Geometric Shapes */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={`geo-${i}`}
                        className="absolute"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.5, 1],
                            opacity: [0.1, 0.4, 0.1],
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                        }}
                        transition={{
                            duration: Math.random() * 25 + 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {i % 3 === 0 ? (
                            <div className="w-8 h-8 border-2 border-cyan-400/30 rotate-45" />
                        ) : i % 3 === 1 ? (
                            <div className="w-6 h-6 bg-purple-500/20 rounded-full" />
                        ) : (
                            <div className="w-10 h-2 bg-pink-500/20 rounded-full" />
                        )}
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial="hidden"
                animate={controls}
                variants={containerVariants}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
            >
                {/* Enhanced Header Section */}
                <motion.div
                    className="text-center mb-20"
                    variants={itemVariants}
                >
                    <motion.div
                        className="inline-block relative mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <motion.h2
                            className="text-lg font-bold tracking-[0.3em] text-cyan-400 mb-4 relative"
                            animate={{
                                textShadow: [
                                    "0 0 10px rgba(34, 211, 238, 0.5)",
                                    "0 0 20px rgba(34, 211, 238, 0.8)",
                                    "0 0 10px rgba(34, 211, 238, 0.5)"
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            ⚡ MY EXPERTISE ⚡
                        </motion.h2>

                        {/* Animated Underline */}
                        <motion.div
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.5, duration: 1 }}
                        />
                    </motion.div>

                    <motion.h1
                        className="text-6xl md:text-8xl font-extrabold mb-8 relative"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                    >
                        <motion.span
                            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                        >
                            Skills
                        </motion.span>
                        <span className="text-white/20 mx-4">&</span>
                        <motion.span
                            className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"]
                            }}
                            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                        >
                            Mastery
                        </motion.span>

                        {/* Floating Elements Around Title */}
                        <motion.div
                            className="absolute -top-4 -right-4 text-4xl"
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            ✨
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-4 -left-4 text-4xl"
                            animate={{
                                rotate: [360, 0],
                                scale: [1, 1.3, 1]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            🚀
                        </motion.div>
                    </motion.h1>

                    <motion.p
                        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        Crafting digital experiences with cutting-edge technologies and passionate dedication to excellence
                    </motion.p>
                </motion.div>

                {/* Category Navigation */}
                <motion.div
                    className="flex justify-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <div className="flex gap-4 p-2 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50">
                        {skillsData.map((category, idx) => (
                            <motion.button
                                key={idx}
                                onClick={() => setSelectedCategory(idx)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${selectedCategory === idx
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {selectedCategory === idx && (
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-20 rounded-xl`}
                                        layoutId="activeCategory"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <span className="text-2xl">{category.emoji}</span>
                                    {category.category}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Enhanced Skills Display */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        {/* Category Header */}
                        <motion.div
                            className="text-center mb-12"
                            style={{
                                rotateX: rotateX,
                                rotateY: rotateY,
                                transformStyle: "preserve-3d"
                            }}
                        >
                            <motion.h2
                                className={`text-5xl font-bold bg-gradient-to-r ${skillsData[selectedCategory].color} bg-clip-text text-transparent mb-4`}
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {skillsData[selectedCategory].emoji} {skillsData[selectedCategory].category}
                            </motion.h2>
                            <motion.div
                                className={`w-32 h-1 bg-gradient-to-r ${skillsData[selectedCategory].color} mx-auto rounded-full`}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8 }}
                            />
                        </motion.div>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {skillsData[selectedCategory].skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    className="group relative"
                                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.6,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    whileHover={{
                                        y: -10,
                                        scale: 1.02,
                                        rotateY: 5,
                                        rotateX: 5
                                    }}
                                    onHoverStart={() => setActiveSkill(skill.name)}
                                    onHoverEnd={() => setActiveSkill(null)}
                                >
                                    {/* Skill Card */}
                                    <motion.div
                                        className={`relative p-8 bg-gradient-to-br from-gray-800/80 via-gray-900/60 to-black/40 rounded-3xl border ${skillsData[selectedCategory].borderColor} backdrop-blur-xl overflow-hidden`}
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        {/* Animated Background */}
                                        <motion.div
                                            className={`absolute inset-0 bg-gradient-to-br ${skillsData[selectedCategory].bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                        />

                                        {/* Floating Particles */}
                                        {activeSkill === skill.name && [...Array(8)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                                                style={{
                                                    top: `${Math.random() * 100}%`,
                                                    left: `${Math.random() * 100}%`,
                                                }}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{
                                                    opacity: [0, 1, 0],
                                                    scale: [0, 1, 0],
                                                    y: [0, -30],
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    delay: i * 0.1,
                                                    repeat: Infinity,
                                                }}
                                            />
                                        ))}

                                        <div className="relative z-10">
                                            {/* Skill Icon */}
                                            <motion.div
                                                className="flex justify-center mb-6"
                                                whileHover={{
                                                    rotate: [0, -10, 10, 0],
                                                    scale: 1.1
                                                }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                <motion.div
                                                    className="p-4 bg-gray-700/50 rounded-2xl border border-gray-600/50 backdrop-blur-sm"
                                                    animate={{
                                                        boxShadow: activeSkill === skill.name ? [
                                                            "0 0 20px rgba(59, 130, 246, 0.3)",
                                                            "0 0 40px rgba(59, 130, 246, 0.6)",
                                                            "0 0 20px rgba(59, 130, 246, 0.3)"
                                                        ] : "0 0 0px rgba(59, 130, 246, 0)"
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    <motion.img
                                                        src={skill.icon}
                                                        alt={skill.name}
                                                        className="w-16 h-16 object-contain filter drop-shadow-lg"
                                                        whileHover={{ rotate: 360 }}
                                                        transition={{ duration: 1 }}
                                                    />
                                                </motion.div>
                                            </motion.div>

                                            {/* Skill Info */}
                                            <div className="text-center">
                                                <motion.h3
                                                    className="text-2xl font-bold text-white mb-2"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    {skill.name}
                                                </motion.h3>

                                                <motion.p
                                                    className="text-gray-400 text-sm mb-4"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    {skill.description}
                                                </motion.p>



                                                {/* Skill Level */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-300 font-medium">Proficiency</span>
                                                        <motion.span
                                                            className={`font-bold bg-gradient-to-r ${skillsData[selectedCategory].color} bg-clip-text text-transparent`}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.5 }}
                                                        >
                                                            {skill.level}%
                                                        </motion.span>
                                                    </div>

                                                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className={`h-full bg-gradient-to-r ${skillsData[selectedCategory].color} relative`}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${skill.level}%` }}
                                                            transition={{
                                                                delay: 0.6 + index * 0.1,
                                                                duration: 1.5,
                                                                ease: "easeOut"
                                                            }}
                                                        >
                                                            {/* Animated Glow */}
                                                            <motion.div
                                                                className="absolute inset-0 bg-white/20"
                                                                animate={{
                                                                    x: ["-100%", "100%"]
                                                                }}
                                                                transition={{
                                                                    duration: 2,
                                                                    repeat: Infinity,
                                                                    delay: 1 + index * 0.1
                                                                }}
                                                            />
                                                        </motion.div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Enhanced Achievement Stats */}
                <motion.div
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    {[
                        { label: "Technologies Mastered", value: "15+", icon: "⚡", color: "from-cyan-400 to-blue-500", bgGlow: "from-cyan-500/20 to-blue-500/20" },
                        { label: "Projects Completed", value: "50+", icon: "💎", color: "from-green-400 to-emerald-500", bgGlow: "from-green-500/20 to-emerald-500/20" },
                        { label: "Code Quality", value: "A+", icon: "🏆", color: "from-orange-400 to-red-500", bgGlow: "from-orange-500/20 to-red-500/20" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            className="group relative p-10 bg-gradient-to-br from-gray-800/80 to-gray-900/60 rounded-3xl border border-gray-700/50 backdrop-blur-xl text-center overflow-hidden shadow-2xl"
                            whileHover={{
                                y: -15,
                                scale: 1.05,
                                boxShadow: "0 40px 80px -12px rgba(59, 130, 246, 0.6)",
                                borderColor: "rgba(59, 130, 246, 0.5)"
                            }}
                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ 
                                delay: 1.7 + index * 0.2,
                                type: "spring",
                                stiffness: 100,
                                damping: 15
                            }}
                        >
                            {/* Enhanced Background Glow */}
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-br ${stat.bgGlow} opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl`}
                                animate={{
                                    scale: [1, 1.05, 1],
                                    opacity: [0, 0.4, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    delay: index * 1
                                }}
                            />

                            {/* Floating Particles */}
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`absolute w-2 h-2 bg-gradient-to-r ${stat.color} rounded-full opacity-0 group-hover:opacity-70`}
                                    style={{
                                        top: `${15 + Math.random() * 70}%`,
                                        left: `${15 + Math.random() * 70}%`,
                                    }}
                                    animate={{
                                        y: [0, -25, 0],
                                        x: [0, Math.random() * 20 - 10, 0],
                                        opacity: [0, 0.7, 0],
                                        scale: [0, 1.2, 0]
                                    }}
                                    transition={{
                                        duration: 3.5,
                                        repeat: Infinity,
                                        delay: i * 0.6 + index * 0.3
                                    }}
                                />
                            ))}

                            <motion.div className="relative z-10">
                                <motion.div
                                    className="text-7xl mb-6 filter drop-shadow-lg"
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.15, 1],
                                        filter: ["drop-shadow(0 0 0px rgba(59, 130, 246, 0))", "drop-shadow(0 0 25px rgba(59, 130, 246, 0.4))", "drop-shadow(0 0 0px rgba(59, 130, 246, 0))"]
                                    }}
                                    transition={{
                                        duration: 4.5,
                                        repeat: Infinity,
                                        delay: index * 0.8,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {stat.icon}
                                </motion.div>
                                
                                <motion.div
                                    className={`text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-4 leading-tight`}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        delay: 1.9 + index * 0.2,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 15
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    {stat.value}
                                </motion.div>
                                
                                <motion.div 
                                    className="text-gray-300 text-lg font-semibold tracking-wide leading-relaxed"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2.1 + index * 0.2 }}
                                >
                                    {stat.label}
                                </motion.div>

                                {/* Progress Ring */}
                                <motion.div
                                    className="absolute top-6 right-6 w-12 h-12"
                                    initial={{ opacity: 0, scale: 0, rotate: -90 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ delay: 2.3 + index * 0.2, type: "spring" }}
                                >
                                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                                        <circle
                                            cx="24"
                                            cy="24"
                                            r="18"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            fill="none"
                                            className="text-gray-700"
                                        />
                                        <motion.circle
                                            cx="24"
                                            cy="24"
                                            r="18"
                                            stroke={`url(#gradient-${index})`}
                                            strokeWidth="3"
                                            fill="none"
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 0.85 }}
                                            transition={{
                                                delay: 2.5 + index * 0.2,
                                                duration: 2,
                                                ease: "easeInOut"
                                            }}
                                            style={{
                                                strokeDasharray: "113.1",
                                                strokeDashoffset: "16.97"
                                            }}
                                        />
                                        <defs>
                                            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor={index === 0 ? "#06b6d4" : index === 1 ? "#10b981" : "#f97316"} />
                                                <stop offset="100%" stopColor={index === 0 ? "#3b82f6" : index === 1 ? "#059669" : "#dc2626"} />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </motion.div>
                            </motion.div>

                            {/* Corner Accent */}
                            <motion.div
                                className={`absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr ${stat.color} opacity-10 rounded-tr-3xl`}
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.1, 0.25, 0.1]
                                }}
                                transition={{
                                    duration: 3.5,
                                    repeat: Infinity,
                                    delay: index * 0.7
                                }}
                            />

                            {/* Top Right Accent */}
                            <motion.div
                                className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${stat.color} opacity-5 rounded-bl-3xl`}
                                animate={{
                                    rotate: [0, 180, 360],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    delay: index * 0.5
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Skills
