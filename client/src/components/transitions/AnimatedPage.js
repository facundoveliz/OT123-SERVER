import React from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const AnimatedPage = ({ children }) => (
  <motion.div
    variants={animations}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 1 }}
  >
    {children}
  </motion.div>
)

AnimatedPage.propTypes = {
  children: PropTypes.element.isRequired,
}

export default AnimatedPage;
