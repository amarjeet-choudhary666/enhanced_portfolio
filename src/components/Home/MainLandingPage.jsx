import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from "react-icons/si";

function MainLandingPage() {
  const [model, setModel] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  useEffect(() => {
    if (model) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, [model]);

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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Custom Cursor Effect */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-blue-500/20 pointer-events-none z-50"
        style={{
          left: cursorPosition.x - 12,
          top: cursorPosition.y - 12,
          scale: isHoveringButton ? 2 : 1,
          mixBlendMode: 'screen'
        }}
        animate={{
          scale: isHoveringButton ? 2.5 : 1,
          backgroundColor: isHoveringButton ? "rgba(99, 102, 241, 0.3)" : "rgba(59, 130, 246, 0.2)"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
      />

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
            <motion.h1 
              className='ml-4 font-poppins text-blue-400'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              MERN Stack Developer
            </motion.h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button 
              onClick={() => setModel(true)}
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setIsHoveringButton(false)}
              className='group relative flex justify-center rounded-lg mt-8 items-center font-poppins bg-gradient-to-r from-blue-500 to-purple-600 p-3 text-xl shadow-lg overflow-hidden'
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(99, 102, 241, 0.7)"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center">
                About me
                <motion.span 
                  className='pl-4'
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <FaArrowRight />
                </motion.span>
              </span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex gap-4 mt-8"
            variants={itemVariants}
          >
            {[
              { icon: <FaGithub />, color: "text-gray-300", hover: "hover:text-white" , link: "https://github.com/amarjeet-choudhary666"},
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

        {/* Floating Tech Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { icon: <SiMongodb className="text-green-500 text-4xl" />, delay: 0 },
            { icon: <SiExpress className="text-gray-300 text-4xl" />, delay: 0.5 },
            { icon: <SiReact className="text-blue-400 text-4xl" />, delay: 1 },
            { icon: <SiNodedotjs className="text-green-600 text-4xl" />, delay: 1.5 },
          ].map((tech, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                y: [0, -50],
                x: [0, (Math.random() - 0.5) * 100]
              }}
              transition={{
                delay: tech.delay,
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 5,
                ease: "linear"
              }}
            >
              {tech.icon}
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
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setModel(false)}></div>
            
            <motion.div 
              className='relative w-[65vw] max-h-[90vh] overflow-y-auto rounded-xl border border-blue-900/30 bg-gradient-to-br from-gray-900 via-black to-blue-900 shadow-2xl shadow-blue-900/50'
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className='flex flex-col md:flex-row p-8'>
                <div className='w-full md:w-1/2 pr-8'>
                  <motion.div variants={itemVariants}>
                    <h1 className='uppercase text-3xl text-blue-400 font-semibold'>about me</h1>
                    <p className='text-gray-300 text-[1.1em] mt-6'>
                      I'm a passionate web developer with a strong focus on crafting clean, efficient, and user-friendly websites. 
                      With experience in both front-end and back-end technologies, I specialize in creating seamless digital 
                      experiences that blend design and functionality. Proficient in HTML, CSS, JavaScript, and modern frameworks 
                      like React and Node.js.
                    </p>
                  </motion.div>

                  <motion.div className='mt-6' variants={itemVariants}>
                    <h2 className='text-xl  text-blue-300 font-semibold mb-4'>Skills & Technologies</h2>
                    <div className='flex flex-wrap gap-2 text-white'>
                      {[
                        '#html', '#css', '#javascript', '#react.js', '#node.js', 
                        '#express.js', '#mongodb', '#tailwind', '#git', '#github',
                        '#jwt', '#bcrypt', '#cloudinary', '#socket.io', '#restapi'
                      ].map((skill, i) => (
                        <motion.span
                          key={i}
                          className='border border-blue-500/30 py-2 px-3 rounded-full text-sm hover:bg-blue-500/10 transition-colors cursor-default'
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: "rgba(59, 130, 246, 0.2)"
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mt-8">
                    <h2 className='uppercase text-blue-400 text-2xl font-semibold mb-4'>MERN Stack</h2>
                    <div className='grid grid-cols-4 gap-4'>
                      {[
                        { icon: <SiMongodb size={40} className="text-green-500" />, name: "MongoDB", color: "text-green-500" },
                        { icon: <SiExpress size={40} className="text-gray-300" />, name: "Express", color: "text-gray-300" },
                        { icon: <SiReact size={40} className="text-blue-400" />, name: "React", color: "text-blue-400" },
                        { icon: <SiNodedotjs size={40} className="text-green-600" />, name: "Node.js", color: "text-green-600" },
                      ].map((tech, i) => (
                        <motion.div 
                          key={i}
                          className="flex flex-col items-center"
                          whileHover={{ y: -5 }}
                        >
                          {tech.icon}
                          <span className={`mt-2 ${tech.color}`}>{tech.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className='w-full md:w-1/2 mt-8 md:mt-0'>
                  <motion.div 
                    className="flex justify-end mb-4"
                    variants={itemVariants}
                  >
                    <motion.button 
                      onClick={() => setModel(false)} 
                      className="relative flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-lg group"
                      whileHover={{ 
                        rotate: 180,
                        scale: 1.1,
                        boxShadow: "0 0 15px rgba(99, 102, 241, 0.7)"
                      }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
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

                  <motion.div
                    variants={itemVariants}
                    className="flex justify-center"
                  >
                    <motion.img 
                      src='https://anuragsinghbam.com/images/coder.svg' 
                      className="w-full max-w-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    />
                  </motion.div>

                  <motion.div 
                    className="mt-8 bg-gray-900/50 p-6 rounded-lg"
                    variants={itemVariants}
                  >
                    <h3 className="text-xl text-blue-300 font-semibold mb-3">Recent Projects</h3>
                    <ul className="space-y-3">
                      {[
                        "E-commerce Platform with React & Node",
                        "Real-time Chat Application",
                        "Task Management Dashboard",
                        "Social Media Analytics Tool"
                      ].map((project, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-center text-gray-300"
                          whileHover={{ x: 5 }}
                        >
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {project}
                        </motion.li>
                      ))}
                    </ul>
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