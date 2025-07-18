import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaGithub, FaLinkedin, FaTwitter, FaCode, FaRocket, FaHeart, FaDownload, FaStar, FaEye, FaExternalLinkAlt } from "react-icons/fa";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiJavascript, SiTailwindcss, SiGit, SiTypescript } from "react-icons/si";

function MainLandingPage() {
  const [model, setModel] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [mouseTrail, setMouseTrail] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showStats, setShowStats] = useState(false);

  const words = ['Full Stack Developer', 'MERN Stack Expert', 'React Specialist', 'Node.js Developer', 'JavaScript Enthusiast'];

  useEffect(() => {
    if (model) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setMouseTrail(prev => [
        ...prev.slice(-8),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
    };

    // Typing effect
    const typingInterval = setInterval(() => {
      const currentWord = words[currentWordIndex];
      if (typedText.length < currentWord.length) {
        setTypedText(currentWord.slice(0, typedText.length + 1));
      } else {
        setTimeout(() => {
          setTypedText('');
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }
    }, 100);

    // Show stats after 3 seconds
    const statsTimer = setTimeout(() => {
      setShowStats(true);
    }, 3000);

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener('mousemove', updateCursorPosition);
      clearInterval(typingInterval);
      clearTimeout(statsTimer);
    };
  }, [model, typedText.length, currentWordIndex, words]);

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className='relative w-full h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 overflow-hidden leading-none'>
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 25 + 8}px`,
              height: `${Math.random() * 25 + 8}px`,
              background: `linear-gradient(45deg, rgba(59, 130, 246, ${Math.random() * 0.4 + 0.1}), rgba(147, 51, 234, ${Math.random() * 0.4 + 0.1}))`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 150],
              x: [0, (Math.random() - 0.5) * 150],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.3, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 12 + 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Mouse Trail Effect */}
      {mouseTrail.map((point, index) => (
        <motion.div
          key={`trail-${index}-${point.id}`}
          className="fixed w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 pointer-events-none z-40"
          style={{
            left: point.x - 6,
            top: point.y - 6,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0.3,
            backgroundColor: `rgba(59, 130, 246, ${0.8 - index * 0.1})`
          }}
          transition={{ duration: 1.2 }}
        />
      ))}

      {/* Enhanced Custom Cursor Effect */}
      <motion.div
        className="fixed w-8 h-8 rounded-full bg-blue-500/20 pointer-events-none z-50 border-2 border-blue-400/40"
        style={{
          left: cursorPosition.x - 16,
          top: cursorPosition.y - 16,
          mixBlendMode: 'screen'
        }}
        animate={{
          scale: isHoveringButton ? 1.8 : 1,
          backgroundColor: isHoveringButton ? "rgba(99, 102, 241, 0.4)" : "rgba(59, 130, 246, 0.2)",
          borderColor: isHoveringButton ? "rgba(99, 102, 241, 0.8)" : "rgba(59, 130, 246, 0.4)"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      />

      {/* Animated Stats Cards */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            className="fixed bottom-6 left-6 z-40 flex gap-3"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {[
              { icon: <FaCode />, value: "50+", label: "Projects", color: "from-green-400 to-blue-500" },
              { icon: <FaHeart />, value: "100%", label: "Passion", color: "from-red-400 to-orange-500" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className={`bg-gray-900/90 backdrop-blur-xl rounded-xl p-3 border border-blue-500/20 min-w-[80px] text-center relative overflow-hidden`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 + 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className={`text-lg bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 relative z-10`}>
                  {stat.icon}
                </div>
                <div className="text-white font-bold text-sm relative z-10">{stat.value}</div>
                <div className="text-gray-400 text-xs relative z-10">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.div
        className="fixed top-1/2 left-6 z-40 transform -translate-y-1/2"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.button
          className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-2xl text-white"
          whileHover={{
            scale: 1.1,
            rotate: 360,
            boxShadow: "0 0 30px rgba(99, 102, 241, 0.8)"
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400 }}
          onClick={() => window.open('https://drive.google.com/file/d/1PN2rnvo8iwKByhes-t6NX4yHDKdWbZbi/view?usp=sharing', '_blank')}
        >
          <FaDownload size={16} />
        </motion.button>
        <motion.div
          className="absolute -right-1 -top-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white text-xs">!</span>
        </motion.div>
      </motion.div>

      <div className='relative flex justify-center items-center h-full'>
        <motion.div 
          className='text-white translate-y-24 z-10'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className='text-7xl font-winky font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-wide'
            variants={itemVariants}
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Amarjeet
            </motion.span>{' '}
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-purple-300"
            >
              Choudhary
            </motion.span>
          </motion.h1>

          <motion.div 
            className='text-2xl mt-4 font-poppins flex items-center'
            variants={itemVariants}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
              className='w-[9vw] h-[5vw] flex justify-center items-center'
            >
              <motion.img 
                src='https://gurzu.com/img/gurzu/mern-stack-01.webp'
                whileHover={{ 
                  scale: 1.1,
                  filter: "brightness(1.2)"
                }}
                transition={{
                  type: "spring",
                  stiffness: 300
                }}
                className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              />
            </motion.div>
            <motion.div
              className='ml-4 font-poppins'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-blue-400 text-2xl mb-2 h-8 flex items-center">
                {typedText}
                <motion.span
                  className="inline-block w-0.5 h-6 bg-blue-400 ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
              <div className="text-gray-400 text-sm">
                Crafting digital experiences with passion ✨
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12">
            {/* Enhanced Beautiful About Me Button */}
            <motion.button
              onClick={() => setModel(true)}
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setIsHoveringButton(false)}
              className='group relative flex justify-center items-center font-poppins text-xl font-semibold px-8 py-4 rounded-2xl overflow-hidden cursor-pointer'
              whileHover={{
                scale: 1.08,
                y: -3,
                boxShadow: "0 20px 50px rgba(99, 102, 241, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Animated Background Layers */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{
                  x: ["-100%", "100%"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
              />

              {/* Button Content */}
              <span className="relative z-10 flex items-center text-white drop-shadow-lg">
                <motion.span
                  className="mr-3 text-2xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  👨‍💻
                </motion.span>

                <motion.span
                  className="tracking-wide"
                  whileHover={{ letterSpacing: "0.1em" }}
                  transition={{ duration: 0.3 }}
                >
                  Discover My Story
                </motion.span>

                <motion.span
                  className='ml-4 flex items-center'
                  animate={{
                    x: [0, 8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut"
                  }}
                >
                  <FaArrowRight className="text-lg" />
                </motion.span>
              </span>

              {/* Pulsing Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-white/30"
                animate={{
                  borderColor: [
                    "rgba(255, 255, 255, 0.3)",
                    "rgba(99, 102, 241, 0.6)",
                    "rgba(168, 85, 247, 0.6)",
                    "rgba(255, 255, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.button>

            {/* Additional Call-to-Action Text */}
            <motion.p
              className="text-center mt-4 text-gray-400 text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.span
                animate={{
                  color: [
                    "rgba(156, 163, 175, 1)",
                    "rgba(59, 130, 246, 1)",
                    "rgba(168, 85, 247, 1)",
                    "rgba(156, 163, 175, 1)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                ✨ Click to explore my journey & expertise ✨
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex gap-4 mt-8"
            variants={itemVariants}
          >
            {[
              { icon: <FaGithub />, color: "text-gray-300", hover: "hover:text-white", link: "https://github.com/amarjeet-choudhary666" },
              { icon: <FaLinkedin />, color: "text-blue-400", hover: "hover:text-blue-300", link: "https://www.linkedin.com/in/amarjeet-choudhary-238399248/" },
              { icon: <FaTwitter />, color: "text-sky-400", hover: "hover:text-sky-300", link: "https://x.com/Amarjee78508156" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                className={`text-2xl ${social.color} ${social.hover} transition-colors`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className='flex justify-center items-center mt-44 w-[70vh] z-10'
          variants={floatingVariants}
          animate="animate"
        >
          <motion.img 
            className='w-full -translate-x-64 opacity-80 hover:opacity-100 transition-opacity duration-300' 
            src='https://anuragsinghbam.com/images/name-logo.svg'
            whileHover={{ 
              rotate: [0, 5, -5, 0],
              transition: { duration: 0.5 }
            }}
          />
        </motion.div>

        {/* Enhanced Floating Tech Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { icon: <SiMongodb className="text-green-500 text-5xl" />, delay: 0, name: "MongoDB" },
            { icon: <SiExpress className="text-gray-300 text-5xl" />, delay: 0.5, name: "Express" },
            { icon: <SiReact className="text-blue-400 text-5xl" />, delay: 1, name: "React" },
            { icon: <SiNodedotjs className="text-green-600 text-5xl" />, delay: 1.5, name: "Node.js" },
            { icon: <SiJavascript className="text-yellow-400 text-4xl" />, delay: 2, name: "JavaScript" },
            { icon: <SiTailwindcss className="text-cyan-400 text-4xl" />, delay: 2.5, name: "Tailwind" },
            { icon: <SiGit className="text-orange-500 text-4xl" />, delay: 3, name: "Git" },
            { icon: <SiTypescript className="text-blue-600 text-4xl" />, delay: 3.5, name: "TypeScript" },
          ].map((tech, i) => (
            <motion.div
              key={i}
              className="absolute group"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{
                opacity: [0, 0.4, 0.2, 0.6, 0],
                y: [0, -80, -160],
                x: [0, (Math.random() - 0.5) * 150],
                scale: [0.5, 1, 0.8, 1.2, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{
                delay: tech.delay,
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                repeatDelay: Math.random() * 8 + 5,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                {tech.icon}
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                >
                  {tech.name}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.1, 0.3, 0.1, 0],
                scale: [0, 1, 1.5, 1, 0],
                rotate: [0, 180, 360],
                x: [0, (Math.random() - 0.5) * 200],
                y: [0, (Math.random() - 0.5) * 200],
              }}
              transition={{
                delay: Math.random() * 5,
                duration: Math.random() * 20 + 15,
                repeat: Infinity,
                repeatDelay: Math.random() * 10 + 5,
                ease: "linear"
              }}
            >
              {i % 3 === 0 ? (
                <div className="w-4 h-4 border-2 border-blue-400/20 rotate-45" />
              ) : i % 3 === 1 ? (
                <div className="w-3 h-3 bg-purple-500/20 rounded-full" />
              ) : (
                <div className="w-5 h-1 bg-cyan-400/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {model && (
          <motion.div
            className='fixed inset-0 w-full h-screen flex justify-center items-center z-50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Enhanced Backdrop */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-black/80 via-blue-900/20 to-purple-900/20 backdrop-blur-xl"
              onClick={() => setModel(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Floating Particles in Background */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              className='relative w-[85vw] max-h-[90vh] overflow-y-auto rounded-2xl border border-blue-500/30 bg-gradient-to-br from-gray-900/95 via-black/90 to-blue-900/95 shadow-2xl shadow-blue-900/50 backdrop-blur-xl'
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Modal Header with Gradient */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              
              <div className='flex flex-col lg:flex-row p-6 gap-6'>
                {/* Left Column - Enhanced */}
                <div className='w-full lg:w-1/2 space-y-6'>
                  {/* About Me Section */}
                  <motion.div variants={itemVariants} className="relative">
                    <motion.div
                      className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4'>
                      About Me ✨
                    </h1>
                    <motion.p
                      className='text-gray-300 text-base leading-relaxed'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      I'm a passionate <span className="text-blue-400 font-semibold">Full Stack Developer</span> with a strong focus on crafting clean, efficient, and user-friendly digital experiences.
                      With expertise in both front-end and back-end technologies, I specialize in creating seamless applications that blend
                      <span className="text-purple-400 font-semibold"> beautiful design</span> with <span className="text-green-400 font-semibold">powerful functionality</span>.
                    </motion.p>
                  </motion.div>

                  {/* Enhanced Skills Section */}
                  <motion.div className='space-y-4' variants={itemVariants}>
                    <h2 className='text-xl font-bold text-blue-300 flex items-center gap-2'>
                      <FaCode className="text-purple-400" />
                      Skills & Technologies
                    </h2>
                    <div className='grid grid-cols-3 gap-2'>
                      {[
                        { name: 'HTML5', color: 'from-orange-500 to-red-500', icon: '🌐' },
                        { name: 'CSS3', color: 'from-blue-500 to-cyan-500', icon: '🎨' },
                        { name: 'JavaScript', color: 'from-yellow-400 to-orange-500', icon: '⚡' },
                        { name: 'React.js', color: 'from-blue-400 to-cyan-400', icon: '⚛️' },
                        { name: 'Node.js', color: 'from-green-500 to-emerald-500', icon: '🚀' },
                        { name: 'Express.js', color: 'from-gray-400 to-gray-600', icon: '🔧' },
                        { name: 'MongoDB', color: 'from-green-600 to-green-400', icon: '🍃' },
                        { name: 'Tailwind', color: 'from-cyan-400 to-blue-500', icon: '💨' },
                        { name: 'Git', color: 'from-orange-500 to-red-500', icon: '📝' },
                      ].map((skill, i) => (
                        <motion.div
                          key={i}
                          className={`relative group bg-gradient-to-r ${skill.color} p-0.5 rounded-lg cursor-pointer`}
                          whileHover={{
                            scale: 1.05,
                            rotate: [0, -2, 2, 0],
                            boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)"
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 + 0.3 }}
                        >
                          <div className="bg-gray-900/90 rounded-lg p-2 text-center backdrop-blur-sm">
                            <div className="text-lg mb-1">{skill.icon}</div>
                            <div className="text-white text-xs font-medium">{skill.name}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Enhanced MERN Stack Section */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <h2 className='text-xl font-bold text-blue-400 flex items-center gap-2'>
                      <FaRocket className="text-green-400" />
                      MERN Stack Expertise
                    </h2>
                    <div className='grid grid-cols-2 gap-3'>
                      {[
                        { icon: <SiMongodb size={40} className="text-green-500" />, name: "MongoDB", desc: "NoSQL Database", color: "text-green-500", bg: "from-green-500/20 to-emerald-500/20" },
                        { icon: <SiExpress size={40} className="text-gray-300" />, name: "Express.js", desc: "Backend Framework", color: "text-gray-300", bg: "from-gray-500/20 to-slate-500/20" },
                        { icon: <SiReact size={40} className="text-blue-400" />, name: "React.js", desc: "Frontend Library", color: "text-blue-400", bg: "from-blue-500/20 to-cyan-500/20" },
                        { icon: <SiNodedotjs size={40} className="text-green-600" />, name: "Node.js", desc: "Runtime Environment", color: "text-green-600", bg: "from-green-600/20 to-lime-500/20" },
                      ].map((tech, i) => (
                        <motion.div
                          key={i}
                          className={`relative group p-4 rounded-xl bg-gradient-to-br ${tech.bg} border border-gray-700/50 backdrop-blur-sm`}
                          whileHover={{
                            scale: 1.02,
                            y: -2,
                            borderColor: "rgba(59, 130, 246, 0.5)"
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 + 0.4 }}
                        >
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                            >
                              {tech.icon}
                            </motion.div>
                            <div>
                              <h3 className={`font-bold text-base ${tech.color}`}>{tech.name}</h3>
                              <p className="text-gray-400 text-xs">{tech.desc}</p>
                            </div>
                          </div>

                          {/* Hover Glow Effect */}
                          <motion.div
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Enhanced */}
                <div className='w-full lg:w-1/2 space-y-6'>
                  {/* Enhanced Close Button */}
                  <motion.div
                    className="flex justify-end"
                    variants={itemVariants}
                  >
                    <motion.button
                      onClick={() => setModel(false)}
                      className="relative group flex justify-center items-center bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-full shadow-2xl"
                      whileHover={{
                        rotate: 180,
                        scale: 1.1,
                        boxShadow: "0 0 30px rgba(239, 68, 68, 0.6)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className="relative z-10 stroke-current"
                      >
                        <path
                          d="M20 20L4 4.00003M20 4L4.00002 20"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.button>
                  </motion.div>

                  {/* Enhanced Coder Image */}
                  <motion.div
                    variants={itemVariants}
                    className="flex justify-center relative"
                  >
                    <motion.div className="relative">
                      <motion.img
                        src='https://anuragsinghbam.com/images/coder.svg'
                        className="w-full max-w-sm drop-shadow-2xl"
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        whileHover={{
                          scale: 1.05,
                          filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))"
                        }}
                      />
                      {/* Floating Elements Around Image */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Projects Section */}
                  <motion.div
                    className="bg-gradient-to-br from-gray-900/80 to-blue-900/20 p-6 rounded-2xl border border-blue-500/20 backdrop-blur-sm relative overflow-hidden"
                    variants={itemVariants}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform rotate-12 scale-150" />
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        Featured Projects
                      </h3>
                      <div className="space-y-3">
                        {[
                          { name: "E-commerce Platform", tech: "React & Node.js", icon: "🛒", color: "from-green-400 to-blue-500" },
                          { name: "Real-time Chat App", tech: "Socket.io & Express", icon: "💬", color: "from-purple-400 to-pink-500" },
                          { name: "Task Management", tech: "MERN Stack", icon: "📋", color: "from-orange-400 to-red-500" },
                          { name: "Analytics Dashboard", tech: "React & Charts.js", icon: "📊", color: "from-cyan-400 to-blue-500" }
                        ].map((project, i) => (
                          <motion.div
                            key={i}
                            className="group flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm cursor-pointer"
                            whileHover={{
                              x: 10,
                              backgroundColor: "rgba(59, 130, 246, 0.1)",
                              borderColor: "rgba(59, 130, 246, 0.3)"
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + 0.6 }}
                          >
                            <motion.div
                              className={`w-10 h-10 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center text-lg`}
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                            >
                              {project.icon}
                            </motion.div>
                            <div className="flex-1">
                              <h4 className="text-white font-semibold text-sm group-hover:text-blue-300 transition-colors">
                                {project.name}
                              </h4>
                              <p className="text-gray-400 text-xs">{project.tech}</p>
                            </div>
                            <div className="flex gap-2">
                              <motion.button
                                className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-blue-500/20"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <FaEye size={12} />
                              </motion.button>
                              <motion.button
                                className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-green-500/20"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <FaExternalLinkAlt size={12} />
                              </motion.button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainLandingPage;