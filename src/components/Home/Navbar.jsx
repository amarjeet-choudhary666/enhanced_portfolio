import React, { useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaDownload, FaStar, FaCode } from 'react-icons/fa';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavbarHidden, setIsNavbarHidden] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showParticles, setShowParticles] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 10);
        setIsNavbarHidden(latest > 100); // Hide navbar after scrolling 100px
    });

    // Update time every second
    React.useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timeInterval);
    }, []);

    const socialLinks = [
        { icon: <FaGithub />, href: "https://github.com/amarjeet-choudhary666", label: "GitHub" },
        { icon: <FaInstagram />, href: "https://instagram.com/amarjeetchoudhary_2003", label: "Instagram" },
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/amarjeet-choudhary-238399248/", label: "LinkedIn" }
    ];

    const navVariants = {
        hidden: { y: -100 },
        visible: { 
            y: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100
            }
        }
    };

    const itemHover = {
        scale: 1.1,
        transition: { type: "spring", stiffness: 400, damping: 10 }
    };

    const itemTap = {
        scale: 0.95
    };

    return (
        <>
            {/* Main Navbar - Hides on scroll */}
            <motion.div 
                className={`fixed w-full z-[999] px-8 py-2 backdrop-blur-3xl border-b border-blue-500/10 ${
                    isScrolled 
                        ? 'bg-gray-900/95 shadow-2xl shadow-blue-900/20' 
                        : 'bg-gray-900/85'
                }`}
                initial="visible"
                animate={isNavbarHidden ? "hidden" : "visible"}
                variants={navVariants}
                onHoverStart={() => setShowParticles(true)}
                onHoverEnd={() => setShowParticles(false)}
            >
            {/* Floating Particles */}
            {showParticles && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ 
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                y: [0, -20],
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Gradient Line */}
            <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: isScrolled ? "100%" : "0%" }}
                transition={{ duration: 0.5 }}
            />

            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                <motion.div 
                    className='logo relative'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <a href='/' className='block relative'>
                        <motion.img 
                            className='w-18 h-auto text-white drop-shadow-lg' 
                            src='https://anuragsinghbam.com/images/name-logo-white.svg'
                            alt="Logo" 
                            whileHover={{ 
                                opacity: 0.9,
                                filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))"
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        {/* Logo Glow Effect */}
                        <motion.div 
                            className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl opacity-0"
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </a>
                </motion.div>
                
                <div className='flex items-center gap-6'>
                    {/* Enhanced CV Button */}
                    <motion.a 
                        className='relative group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white font-poppins font-medium backdrop-blur-sm'
                        target='_blank' 
                        rel='noopener noreferrer' 
                        href='https://drive.google.com/file/d/1PN2rnvo8iwKByhes-t6NX4yHDKdWbZbi/view?usp=sharing'
                        whileHover={{ 
                            scale: 1.05,
                            backgroundColor: "rgba(59, 130, 246, 0.2)",
                            boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)"
                        }}
                        whileTap={itemTap}
                        onHoverStart={() => setHoveredItem('cv')}
                        onHoverEnd={() => setHoveredItem(null)}
                    >
                        <motion.div
                            animate={{ rotate: hoveredItem === 'cv' ? 360 : 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <FaDownload className="text-sm" />
                        </motion.div>
                        <span>Resume</span>
                        
                        {/* Floating Badge */}
                        <motion.div 
                            className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        {/* Hover Glow */}
                        <motion.div 
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                    </motion.a>
                    
                    {/* Enhanced Social Links */}
                    {socialLinks.map((link, index) => (
                        <motion.a 
                            key={index}
                            href={link.href} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group p-3 rounded-full bg-gray-800/50 border border-gray-700/50 text-white hover:text-blue-400 backdrop-blur-sm"
                            whileHover={{ 
                                scale: 1.1,
                                backgroundColor: "rgba(59, 130, 246, 0.1)",
                                borderColor: "rgba(59, 130, 246, 0.3)",
                                boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)"
                            }}
                            whileTap={itemTap}
                            onHoverStart={() => setHoveredItem(link.label)}
                            onHoverEnd={() => setHoveredItem(null)}
                            aria-label={link.label}
                        >
                            <motion.div
                                animate={{ 
                                    rotate: hoveredItem === link.label ? [0, -10, 10, 0] : 0,
                                    scale: hoveredItem === link.label ? 1.1 : 1
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                {link.icon}
                            </motion.div>
                            
                            {/* Tooltip */}
                            {hoveredItem === link.label && (
                                <motion.div 
                                    className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-3 py-1 rounded-lg backdrop-blur-sm border border-blue-500/20"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {link.label}
                                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45 border-l border-t border-blue-500/20" />
                                </motion.div>
                            )}
                            
                            {/* Ripple Effect */}
                            <motion.div 
                                className="absolute inset-0 rounded-full bg-blue-500/20 opacity-0 group-hover:opacity-100"
                                animate={{ scale: hoveredItem === link.label ? [1, 1.5, 1] : 1 }}
                                transition={{ duration: 0.6 }}
                            />
                        </motion.a>
                    ))}
                </div>
            </div>
        </motion.div>

        {/* Time/Date Widget - Shows when navbar is hidden */}
        <motion.div 
            className="fixed top-4 right-4 z-[1000] bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 border border-blue-500/20 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ 
                opacity: isNavbarHidden ? 1 : 0,
                scale: isNavbarHidden ? 1 : 0.8,
                y: isNavbarHidden ? 0 : -20
            }}
            transition={{ duration: 0.3, type: "spring" }}
            style={{ pointerEvents: isNavbarHidden ? 'auto' : 'none' }}
        >
            <div className="text-center">
                <motion.div 
                    className="text-blue-400 text-lg font-mono font-bold"
                    animate={{ 
                        textShadow: [
                            "0 0 10px rgba(59, 130, 246, 0.5)",
                            "0 0 20px rgba(59, 130, 246, 0.8)",
                            "0 0 10px rgba(59, 130, 246, 0.5)"
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </motion.div>
                <div className="text-gray-300 text-xs mt-1">
                    {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
                <motion.div 
                    className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"
                    animate={{ scaleX: [0, 1] }}
                    transition={{ duration: 2, delay: 0.5 }}
                />
            </div>
        </motion.div>
        </>
    );
};

export default Navbar;