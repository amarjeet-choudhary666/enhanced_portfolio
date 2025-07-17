import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import amarjeetpic from "../../assets/amarjeetpic.png"

const AboutMe = () => {
    const [isVisible, setIsVisible] = useState(false)
    const controls = useAnimation()
    const scrollTimeout = useRef(null)

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
            }, 200) // throttle scroll event every 200ms
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check on initial render
        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
        }
    }, [controls])

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
            {/* Floating background tech icons */}
            <FloatingTechIcon icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" top={15} left={5} delay={0} size={32} />
            <FloatingTechIcon icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" top={25} left={85} delay={0.5} size={28} />
            <FloatingTechIcon icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" top={70} left={10} delay={1} size={24} />
            <FloatingTechIcon icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" top={40} left={70} delay={0.8} size={26} />

            {/* Glowing dots */}
            <div className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-blue-500 blur-xl opacity-10 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-8 h-8 rounded-full bg-purple-500 blur-xl opacity-10 animate-pulse delay-1000"></div>
            <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-pink-500 blur-xl opacity-10 animate-pulse delay-1500"></div>

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
                            <motion.div 
                                className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300"
                                whileHover={{ 
                                    y: -5,
                                    boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.3)"
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                                        <span className="text-2xl text-purple-400">👨‍💻</span>
                                    </div>
                                    <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
                                        Hi, I am a Full Stack Web Developer and Web Designer. An Open Source enthusiast and a Computer Science graduate from India.
                                    </p>
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300"
                                whileHover={{ 
                                    y: -5,
                                    boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.3)"
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                                        <span className="text-2xl text-blue-400">🚀</span>
                                    </div>
                                    <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
                                        I am a Software engineer with a strong foundation in Computer Science, specializing in web development. A skilled MERN Stack Developer with expertise in building dynamic and responsive web applications.
                                    </p>
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300"
                                whileHover={{ 
                                    y: -5,
                                    boxShadow: "0 10px 30px -10px rgba(34, 197, 94, 0.3)"
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                                        <span className="text-2xl text-green-400">💡</span>
                                    </div>
                                    <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
                                        I love working on new and exciting technologies. I have a keen interest in Web Development and I am always looking for new opportunities to learn and grow.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Tech Icons Grid */}
                        <motion.div 
                            className="mt-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <h3 className="text-xl font-semibold text-gray-400 mb-4">Technologies I work with:</h3>
                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                                {techIcons.map((tech, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex flex-col items-center group"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 + index * 0.1 }}
                                        whileHover={{ 
                                            y: -8,
                                            scale: 1.1
                                        }}
                                    >
                                        <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700/50 group-hover:border-purple-500/50 transition-all duration-300">
                                            <img 
                                                src={tech.icon} 
                                                alt={tech.name}
                                                className="w-8 h-8 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <span className="text-xs mt-2 text-gray-400 group-hover:text-white transition-colors">{tech.name}</span>
                                    </motion.div>
                                ))}
                            </div>
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
                    className="flex flex-wrap justify-center gap-6 mt-20"
                    variants={contentVariants}
                >
                    <motion.button
                        onClick={handleSkillsClick}
                        whileHover={{ 
                            scale: 1.05, 
                            y: -5,
                            background: "linear-gradient(to right, #3b82f6, #8b5cf6)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="relative overflow-hidden text-xl md:text-2xl px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 group"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <motion.span 
                                animate={{ rotate: [0, 20, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                🎯
                            </motion.span>
                            <span>VIEW SKILLS</span>
                        </span>
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                        />
                    </motion.button>
                    
                    <motion.a
                        rel='noreferrer'
                        target='_blank'
                        href='https://drive.google.com/file/d/1PN2rnvo8iwKByhes-t6NX4yHDKdWbZbi/view?usp=sharing'
                        whileHover={{ 
                            scale: 1.05, 
                            y: -5,
                            background: "linear-gradient(to right, #8b5cf6, #ec4899)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="relative overflow-hidden text-sm md:text-2xl px-8 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-3 group"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <motion.span
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                📄
                            </motion.span>
                            <span>DOWNLOAD RESUME</span>
                        </span>
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                        />
                    </motion.a>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default AboutMe