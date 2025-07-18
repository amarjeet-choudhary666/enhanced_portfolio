import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import amarjeetpic from "../../assets/amarjeetpic.png"

const AboutMe = () => {
    const [, setIsVisible] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [hoveredCard, setHoveredCard] = useState(null)
    const controls = useAnimation()
    const scrollTimeout = useRef(null)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
    const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])

    useEffect(() => {
        const handleScroll = () => {
            if (scrollTimeout.current) return
            scrollTimeout.current = setTimeout(() => {
                const element = document.getElementById('about-section')
                if (element) {
                    const position = element.getBoundingClientRect()
                    if (position.top < window.innerHeight - 100) {
                        setIsVisible(true)
                        controls.start("visible")
                    }
                }
                scrollTimeout.current = null
            }, 200)
        }

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e
            const { innerWidth, innerHeight } = window
            setMousePosition({
                x: (clientX / innerWidth) * 100,
                y: (clientY / innerHeight) * 100
            })
            mouseX.set(clientX - innerWidth / 2)
            mouseY.set(clientY - innerHeight / 2)
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('mousemove', handleMouseMove)
        handleScroll() // Check on initial render

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('mousemove', handleMouseMove)
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
        }
    }, [controls, mouseX, mouseY])

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

    const contentVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9]
            }
        }
    }

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.85, rotate: -5 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 1,
                ease: "backOut"
            }
        },
        hover: {
            rotate: [0, 3, -3, 0],
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    }

    const techIcons = [
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", name: "React" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", name: "Node.js" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", name: "MongoDB" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", name: "JavaScript" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", name: "TypeScript" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg", name: "Tailwind" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", name: "Git" },
        { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", name: "Express" }
    ]

    const handleSkillsClick = () => {
        const skillsSection = document.getElementById('skills-section')
        if (skillsSection) {
            skillsSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const FloatingTechIcon = ({ icon, top, left, delay, size = 24 }) => (
        <motion.div
            className="absolute opacity-10 hover:opacity-30 transition-opacity"
            style={{ top: `${top}%`, left: `${left}%` }}
            animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0]
            }}
            transition={{
                duration: 8 + Math.random() * 4,
                delay,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <img src={icon} alt="" className={`w-${size} h-${size}`} />
        </motion.div>
    )


    return (
        <div id="about-section" className="min-h-screen font-winky w-full text-white bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 relative overflow-hidden">
            {/* Enhanced Particle System */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Tech Icons with Enhanced Animation */}
                <FloatingTechIcon icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" top={15} left={5} delay={0} size={32} />
                <FloatingTechIcon icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" top={25} left={85} delay={0.5} size={28} />
                <FloatingTechIcon icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" top={70} left={10} delay={1} size={24} />
                <FloatingTechIcon icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" top={40} left={70} delay={0.8} size={26} />
                <FloatingTechIcon icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" top={60} left={90} delay={1.2} size={24} />
                <FloatingTechIcon icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" top={80} left={20} delay={1.5} size={28} />

                {/* Enhanced Glowing Orbs */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full blur-sm ${i % 3 === 0 ? 'bg-blue-500' :
                            i % 3 === 1 ? 'bg-purple-500' : 'bg-pink-500'
                            }`}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 8 + 4}px`,
                            height: `${Math.random() * 8 + 4}px`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, Math.random() * 20 - 10, 0],
                            opacity: [0.1, 0.6, 0.1],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: Math.random() * 8 + 6,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Interactive Mouse-Following Gradient */}
                <motion.div
                    className="absolute w-96 h-96 rounded-full opacity-5"
                    style={{
                        background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(147,51,234,0.2) 50%, transparent 100%)',
                        left: `${mousePosition.x}%`,
                        top: `${mousePosition.y}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Geometric Shapes */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={`shape-${i}`}
                        className="absolute"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 15,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {i % 2 === 0 ? (
                            <div className="w-6 h-6 border-2 border-blue-400/20 rotate-45" />
                        ) : (
                            <div className="w-4 h-4 bg-purple-500/20 rounded-full" />
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
                <div className="text-center mb-16">
                    <motion.div
                        className="inline-block relative"
                        variants={contentVariants}
                        whileHover={{ scale: 1.02 }}
                    >
                        <h1 className="text-6xl md:text-8xl uppercase font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative z-10">
                            About Me
                        </h1>
                        <motion.div
                            className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-lg rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 1.5, ease: "anticipate" }}
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        className="order-2 lg:order-1"
                        variants={contentVariants}
                    >
                        <div className="space-y-8">
                            {/* Enhanced 3D Cards with Next-Level Effects */}
                            <motion.div
                                className="group relative p-8 bg-gradient-to-br from-gray-800/60 via-gray-900/40 to-purple-900/20 rounded-3xl border border-gray-700/50 backdrop-blur-xl overflow-hidden"
                                style={{
                                    rotateX: rotateX,
                                    rotateY: rotateY,
                                    transformStyle: "preserve-3d"
                                }}
                                whileHover={{
                                    y: -15,
                                    scale: 1.02,
                                    boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4)",
                                    borderColor: "rgba(139, 92, 246, 0.6)"
                                }}
                                onHoverStart={() => setHoveredCard(0)}
                                onHoverEnd={() => setHoveredCard(null)}
                                transition={{ duration: 0.4, type: "spring" }}
                            >
                                {/* Animated Background Gradient */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    animate={{
                                        background: hoveredCard === 0 ? [
                                            "linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))",
                                            "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1))",
                                            "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(139, 92, 246, 0.1))"
                                        ] : "linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))"
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                {/* Floating Particles */}
                                {hoveredCard === 0 && [...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 bg-purple-400/60 rounded-full"
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
                                            delay: i * 0.2,
                                            repeat: Infinity,
                                        }}
                                    />
                                ))}

                                <div className="flex items-start gap-6 relative z-10">
                                    <motion.div
                                        className="bg-gradient-to-br from-purple-500/20 to-purple-600/30 p-4 rounded-2xl border border-purple-500/30 backdrop-blur-sm"
                                        whileHover={{
                                            rotate: [0, -10, 10, 0],
                                            scale: 1.1
                                        }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <motion.span
                                            className="text-4xl"
                                            animate={{
                                                rotate: hoveredCard === 0 ? [0, 10, -10, 0] : 0
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            👨‍💻
                                        </motion.span>
                                    </motion.div>
                                    <div className="flex-1">
                                        <motion.h3
                                            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            Full Stack Developer
                                        </motion.h3>
                                        <motion.p
                                            className="text-lg leading-relaxed text-gray-300 group-hover:text-white transition-colors duration-300"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            Hi, I am a <span className="text-purple-400 font-semibold">Full Stack Web Developer</span> and <span className="text-blue-400 font-semibold">Web Designer</span>. An Open Source enthusiast and a Computer Science graduate from India with passion for creating amazing digital experiences.
                                        </motion.p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="group relative p-8 bg-gradient-to-br from-gray-800/60 via-gray-900/40 to-blue-900/20 rounded-3xl border border-gray-700/50 backdrop-blur-xl overflow-hidden"
                                style={{
                                    rotateX: rotateX,
                                    rotateY: rotateY,
                                    transformStyle: "preserve-3d"
                                }}
                                whileHover={{
                                    y: -15,
                                    scale: 1.02,
                                    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)",
                                    borderColor: "rgba(59, 130, 246, 0.6)"
                                }}
                                onHoverStart={() => setHoveredCard(1)}
                                onHoverEnd={() => setHoveredCard(null)}
                                transition={{ duration: 0.4, type: "spring" }}
                            >
                                {/* Animated Background */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    animate={{
                                        background: hoveredCard === 1 ? [
                                            "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))",
                                            "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))",
                                            "linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))"
                                        ] : "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))"
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                {/* Floating Particles */}
                                {hoveredCard === 1 && [...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 bg-blue-400/60 rounded-full"
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
                                            delay: i * 0.2,
                                            repeat: Infinity,
                                        }}
                                    />
                                ))}

                                <div className="flex items-start gap-6 relative z-10">
                                    <motion.div
                                        className="bg-gradient-to-br from-blue-500/20 to-cyan-600/30 p-4 rounded-2xl border border-blue-500/30 backdrop-blur-sm"
                                        whileHover={{
                                            rotate: [0, -10, 10, 0],
                                            scale: 1.1
                                        }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <motion.span
                                            className="text-4xl"
                                            animate={{
                                                y: hoveredCard === 1 ? [0, -5, 0] : 0
                                            }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            🚀
                                        </motion.span>
                                    </motion.div>
                                    <div className="flex-1">
                                        <motion.h3
                                            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            MERN Stack Expert
                                        </motion.h3>
                                        <motion.p
                                            className="text-lg leading-relaxed text-gray-300 group-hover:text-white transition-colors duration-300"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            I am a <span className="text-blue-400 font-semibold">Software Engineer</span> with a strong foundation in Computer Science, specializing in web development. A skilled <span className="text-cyan-400 font-semibold">MERN Stack Developer</span> with expertise in building dynamic and responsive web applications.
                                        </motion.p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="group relative p-8 bg-gradient-to-br from-gray-800/60 via-gray-900/40 to-green-900/20 rounded-3xl border border-gray-700/50 backdrop-blur-xl overflow-hidden"
                                style={{
                                    rotateX: rotateX,
                                    rotateY: rotateY,
                                    transformStyle: "preserve-3d"
                                }}
                                whileHover={{
                                    y: -15,
                                    scale: 1.02,
                                    boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.4)",
                                    borderColor: "rgba(34, 197, 94, 0.6)"
                                }}
                                onHoverStart={() => setHoveredCard(2)}
                                onHoverEnd={() => setHoveredCard(null)}
                                transition={{ duration: 0.4, type: "spring" }}
                            >
                                {/* Animated Background */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    animate={{
                                        background: hoveredCard === 2 ? [
                                            "linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))",
                                            "linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))",
                                            "linear-gradient(45deg, rgba(20, 184, 166, 0.1), rgba(34, 197, 94, 0.1))"
                                        ] : "linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))"
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                {/* Floating Particles */}
                                {hoveredCard === 2 && [...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-2 h-2 bg-green-400/60 rounded-full"
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
                                            delay: i * 0.2,
                                            repeat: Infinity,
                                        }}
                                    />
                                ))}

                                <div className="flex items-start gap-6 relative z-10">
                                    <motion.div
                                        className="bg-gradient-to-br from-green-500/20 to-emerald-600/30 p-4 rounded-2xl border border-green-500/30 backdrop-blur-sm"
                                        whileHover={{
                                            rotate: [0, -10, 10, 0],
                                            scale: 1.1
                                        }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <motion.span
                                            className="text-4xl"
                                            animate={{
                                                scale: hoveredCard === 2 ? [1, 1.2, 1] : 1
                                            }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            💡
                                        </motion.span>
                                    </motion.div>
                                    <div className="flex-1">
                                        <motion.h3
                                            className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            Innovation Enthusiast
                                        </motion.h3>
                                        <motion.p
                                            className="text-lg leading-relaxed text-gray-300 group-hover:text-white transition-colors duration-300"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            I love working on <span className="text-green-400 font-semibold">new and exciting technologies</span>. I have a keen interest in Web Development and I am always looking for new opportunities to <span className="text-emerald-400 font-semibold">learn and grow</span> in this ever-evolving field.
                                        </motion.p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Enhanced Tech Icons Grid with Next-Level Effects */}
                        <motion.div
                            className="mt-16 relative"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            {/* Section Header with Gradient */}
                            <motion.div className="text-center mb-12">
                                <motion.h3
                                    className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 }}
                                >
                                    🚀 Technologies I Master
                                </motion.h3>
                                <motion.div
                                    className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 1.4, duration: 0.8 }}
                                />
                            </motion.div>

                            {/* Enhanced Tech Grid - Bigger & More Beautiful */}
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 max-w-5xl mx-auto">
                                {techIcons.map((tech, index) => (
                                    <motion.div
                                        key={index}
                                        className="group relative"
                                        initial={{ opacity: 0, y: 40, scale: 0.7 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            delay: 1.2 + index * 0.15,
                                            duration: 0.8,
                                            type: "spring",
                                            stiffness: 120,
                                            damping: 15
                                        }}
                                        whileHover={{
                                            y: -20,
                                            scale: 1.2,
                                            rotateY: 20,
                                            rotateX: 15,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        {/* Enhanced Glow Effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                rotate: [0, 180, 360]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />

                                        {/* Floating Particles */}
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-80"
                                                style={{
                                                    top: `${20 + Math.random() * 60}%`,
                                                    left: `${20 + Math.random() * 60}%`,
                                                }}
                                                animate={{
                                                    y: [0, -30, 0],
                                                    x: [0, Math.random() * 20 - 10, 0],
                                                    opacity: [0, 0.8, 0],
                                                    scale: [0, 1.5, 0]
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    delay: i * 0.5 + index * 0.1
                                                }}
                                            />
                                        ))}

                                        {/* Enhanced Tech Card */}
                                        <motion.div
                                            className="relative p-6 bg-gradient-to-br from-gray-800/90 via-gray-900/70 to-black/50 rounded-3xl border border-gray-700/50 backdrop-blur-xl group-hover:border-purple-500/70 transition-all duration-700 overflow-hidden shadow-2xl"
                                            style={{ transformStyle: "preserve-3d" }}
                                        >
                                            {/* Animated Background Pattern */}
                                            <motion.div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                                                style={{
                                                    background: `conic-gradient(from 0deg, ${index % 4 === 0 ? '#3b82f6' :
                                                        index % 4 === 1 ? '#8b5cf6' :
                                                            index % 4 === 2 ? '#ec4899' : '#10b981'
                                                        }40 0deg, transparent 90deg, ${index % 4 === 0 ? '#3b82f6' :
                                                            index % 4 === 1 ? '#8b5cf6' :
                                                                index % 4 === 2 ? '#ec4899' : '#10b981'
                                                        }40 180deg, transparent 270deg)`
                                                }}
                                                animate={{
                                                    rotate: [0, 360],
                                                }}
                                                transition={{
                                                    duration: 15,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                            />

                                            {/* Corner Accents */}
                                            <motion.div
                                                className={`absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl ${index % 4 === 0 ? 'from-blue-500' :
                                                        index % 4 === 1 ? 'from-purple-500' :
                                                            index % 4 === 2 ? 'from-pink-500' : 'from-green-500'
                                                    } opacity-20 rounded-bl-2xl`}
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.2, 0.4, 0.2]
                                                }}
                                                transition={{
                                                    duration: 2.5,
                                                    repeat: Infinity,
                                                    delay: index * 0.2
                                                }}
                                            />

                                            {/* Tech Icon */}
                                            <motion.div className="relative z-10 flex flex-col items-center">
                                                <motion.div
                                                    className="relative"
                                                    whileHover={{
                                                        rotate: [0, -10, 10, 0],
                                                        scale: 1.1
                                                    }}
                                                    transition={{ duration: 0.6 }}
                                                >
                                                    <img
                                                        src={tech.icon}
                                                        alt={tech.name}
                                                        className="w-10 h-10 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 drop-shadow-lg"
                                                    />

                                                    {/* Floating Particles around Icon */}
                                                    {[...Array(3)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="absolute w-1 h-1 bg-blue-400/60 rounded-full opacity-0 group-hover:opacity-100"
                                                            style={{
                                                                top: `${Math.random() * 100}%`,
                                                                left: `${Math.random() * 100}%`,
                                                            }}
                                                            animate={{
                                                                y: [0, -15, 0],
                                                                opacity: [0, 1, 0],
                                                                scale: [0, 1, 0],
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                delay: i * 0.3,
                                                                repeat: Infinity,
                                                            }}
                                                        />
                                                    ))}
                                                </motion.div>

                                                {/* Tech Name */}
                                                <motion.span
                                                    className="text-xs mt-3 text-gray-400 group-hover:text-white transition-colors duration-300 font-medium"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 1.4 + index * 0.1 }}
                                                >
                                                    {tech.name}
                                                </motion.span>

                                                {/* Skill Level Indicator */}
                                                <motion.div
                                                    className="w-full h-1 bg-gray-700 rounded-full mt-2 overflow-hidden"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 1.6 + index * 0.1 }}
                                                >
                                                    <motion.div
                                                        className={`h-full rounded-full ${index % 3 === 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                                                            index % 3 === 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                                                                'bg-gradient-to-r from-green-500 to-emerald-500'
                                                            }`}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${Math.random() * 30 + 70}%` }}
                                                        transition={{
                                                            delay: 1.8 + index * 0.1,
                                                            duration: 1,
                                                            ease: "easeOut"
                                                        }}
                                                    />
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Floating Tech Stats */}
                            <motion.div
                                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.5, duration: 0.8 }}
                            >
                                {[
                                    { label: "Projects Built", value: "50+", icon: "🚀", color: "from-purple-500 to-pink-500" },
                                    { label: "Technologies", value: "15+", icon: "⚡", color: "from-green-500 to-emerald-500" },
                                    { label: "Code Quality", value: "A+", icon: "💎", color: "from-orange-500 to-red-500" }
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="group relative p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-2xl border border-gray-700/50 backdrop-blur-sm text-center overflow-hidden"
                                        whileHover={{
                                            y: -8,
                                            scale: 1.05,
                                            boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.3)"
                                        }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 2.7 + index * 0.1 }}
                                    >
                                        {/* Background Glow */}
                                        <motion.div
                                            className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                                        />

                                        <motion.div className="relative z-10">
                                            <motion.div
                                                className="text-3xl mb-2"
                                                animate={{
                                                    rotate: [0, 10, -10, 0],
                                                    scale: [1, 1.1, 1]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: index * 0.5
                                                }}
                                            >
                                                {stat.icon}
                                            </motion.div>
                                            <motion.div
                                                className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    delay: 2.9 + index * 0.1,
                                                    type: "spring",
                                                    stiffness: 200
                                                }}
                                            >
                                                {stat.value}
                                            </motion.div>
                                            <div className="text-gray-400 text-sm font-medium">
                                                {stat.label}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="order-1 lg:order-2 relative flex justify-center"
                        variants={imageVariants}
                        whileHover="hover"
                    >
                        <div className="relative">
                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-10"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.1, 0.15, 0.1]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Profile image */}
                            <motion.div
                                className="relative z-10 rounded-full border-4 border-purple-500/50 overflow-hidden shadow-2xl shadow-purple-500/20"
                                style={{
                                    background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))'
                                }}
                                whileHover={{
                                    boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)"
                                }}
                            >
                                <motion.img
                                    src={amarjeetpic}
                                    alt="Profile"
                                    className="w-64 h-64 md:w-80 md:h-80 object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                                />
                            </motion.div>

                            {/* Floating elements around profile */}
                            <motion.div
                                className="absolute -top-6 -right-6 w-16 h-16 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-sm"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 10, 0]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <motion.div
                                className="absolute -bottom-6 -left-6 w-20 h-20 bg-purple-500/10 rounded-full border border-purple-500/20 backdrop-blur-sm"
                                animate={{
                                    scale: [1, 1.05, 1],
                                    rotate: [0, -5, 0]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1
                                }}
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="flex flex-wrap justify-center gap-8 mt-24"
                    variants={contentVariants}
                >
                    {/* Enhanced VIEW SKILLS Button */}
                    <motion.button
                        onClick={handleSkillsClick}
                        className="group relative overflow-hidden px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white font-bold text-xl shadow-2xl"
                        whileHover={{
                            scale: 1.08,
                            y: -8,
                            boxShadow: "0 25px 50px rgba(59, 130, 246, 0.6)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5, duration: 0.8 }}
                    >
                        {/* Animated Background Layers */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Shimmer Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                            animate={{
                                x: ["-100%", "100%"]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                repeatDelay: 1.5,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Floating Particles */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white/70 rounded-full opacity-0 group-hover:opacity-100"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -25, 0],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0],
                                }}
                                transition={{
                                    duration: 2.5,
                                    delay: i * 0.3,
                                    repeat: Infinity,
                                }}
                            />
                        ))}

                        <span className="relative z-10 flex items-center gap-3">
                            <motion.span
                                className="text-2xl"
                                animate={{
                                    rotate: [0, 15, -15, 0],
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                🎯
                            </motion.span>
                            <span className="tracking-wide">VIEW SKILLS</span>
                            <motion.div
                                animate={{
                                    x: [0, 5, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                →
                            </motion.div>
                        </span>

                        {/* Pulsing Border */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-white/40"
                            animate={{
                                borderColor: [
                                    "rgba(255, 255, 255, 0.4)",
                                    "rgba(59, 130, 246, 0.8)",
                                    "rgba(147, 51, 234, 0.8)",
                                    "rgba(255, 255, 255, 0.4)"
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </motion.button>

                    {/* Enhanced DOWNLOAD RESUME Button */}
                    <motion.a
                        rel='noreferrer'
                        target='_blank'
                        href='https://drive.google.com/file/d/1PN2rnvo8iwKByhes-t6NX4yHDKdWbZbi/view?usp=sharing'
                        className="group relative overflow-hidden px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-600 text-white font-bold text-xl shadow-2xl"
                        whileHover={{
                            scale: 1.08,
                            y: -8,
                            boxShadow: "0 25px 50px rgba(168, 85, 247, 0.6)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.7, duration: 0.8 }}
                    >
                        {/* Animated Background Layers */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-700"
                            animate={{
                                backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Shimmer Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                            animate={{
                                x: ["-100%", "100%"]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                repeatDelay: 2,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Floating Particles */}
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white/70 rounded-full opacity-0 group-hover:opacity-100"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -25, 0],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0],
                                }}
                                transition={{
                                    duration: 2.5,
                                    delay: i * 0.3,
                                    repeat: Infinity,
                                }}
                            />
                        ))}

                        <span className="relative z-10 flex items-center gap-3">
                            <motion.span
                                className="text-2xl"
                                animate={{
                                    y: [0, -8, 0],
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                📄
                            </motion.span>
                            <span className="tracking-wide">DOWNLOAD RESUME</span>
                            <motion.div
                                animate={{
                                    y: [0, -3, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                ↓
                            </motion.div>
                        </span>

                        {/* Pulsing Border */}
                        <motion.div
                            className="absolute inset-0 rounded-2xl border-2 border-white/40"
                            animate={{
                                borderColor: [
                                    "rgba(255, 255, 255, 0.4)",
                                    "rgba(168, 85, 247, 0.8)",
                                    "rgba(236, 72, 153, 0.8)",
                                    "rgba(255, 255, 255, 0.4)"
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        {/* Download Icon Animation */}
                        <motion.div
                            className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 360]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity
                            }}
                        >
                            <span className="text-xs">⬇</span>
                        </motion.div>
                    </motion.a>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default AboutMe