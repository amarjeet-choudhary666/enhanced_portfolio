import React, { useEffect, useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 10);
    });

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
        <motion.div 
            className={`fixed w-full z-[999] px-8 py-2 backdrop-blur-3xl ${isScrolled ? 'bg-gray-900/90 shadow-lg' : 'bg-gray-900/80'}`}
            initial="hidden"
            animate="visible"
            variants={navVariants}
        >
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                <motion.div 
                    className='logo'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <a href='/' className='block'>
                        <motion.img 
                            className='w-24 h-auto text-white' 
                            src='https://anuragsinghbam.com/images/name-logo-white.svg'
                            alt="Logo" 
                            whileHover={{ opacity: 0.8 }}
                            transition={{ duration: 0.2 }}
                        />
                    </a>
                </motion.div>
                
                <div className='flex items-center gap-8'>
                    <motion.a 
                        className='relative text-2xl font-poppins text-white hover:text-blue-400'
                        target='_blank' 
                        rel='noopener noreferrer' 
                        href='https://drive.google.com/file/d/1PN2rnvo8iwKByhes-t6NX4yHDKdWbZbi/view?usp=sharing'
                        whileHover={itemHover}
                        whileTap={itemTap}
                        onHoverStart={() => setHoveredItem('cv')}
                        onHoverEnd={() => setHoveredItem(null)}
                    >
                        CV
                        {hoveredItem === 'cv' && (
                            <motion.span 
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                exit={{ scaleX: 0 }}
                                transition={{ duration: 0.3 }}
                                layoutId="underline"
                            />
                        )}
                    </motion.a>
                    
                    {socialLinks.map((link, index) => (
                        <motion.a 
                            key={index}
                            href={link.href} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative text-2xl text-white hover:text-blue-400"
                            whileHover={itemHover}
                            whileTap={itemTap}
                            onHoverStart={() => setHoveredItem(link.label)}
                            onHoverEnd={() => setHoveredItem(null)}
                            aria-label={link.label}
                        >
                            {link.icon}
                            {hoveredItem === link.label && (
                                <motion.span 
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    exit={{ scaleX: 0 }}
                                    transition={{ duration: 0.3 }}
                                    layoutId="underline"
                                />
                            )}
                        </motion.a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;