import { easeInOut, motion } from "motion/react"

export default function Loader() {
  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.5,
      },
    },
    initial: {},
  }

  const textVariants = {
    initial: {
      opacity: 0,
      y: -100,
    },
    start: {
      opacity: [0, 1, 1, 0],
      y: [-100, 0, 0, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        repeatDelay: 1,
        ease: easeInOut,
        times: [0, 0.16, 0.83, 1],
      },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="initial" animate="start" id="loader">
      <motion.h1 variants={textVariants}>Setting up your</motion.h1>
      <motion.h1 variants={textVariants}>questions and</motion.h1>
      <motion.h1 variants={textVariants} className="loading-dots">
        answers
      </motion.h1>
    </motion.div>
  )
}
