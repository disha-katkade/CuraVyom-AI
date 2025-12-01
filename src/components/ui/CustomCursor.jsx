import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth physics for the trailing scanner
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button') || e.target.getAttribute('role') === 'button') {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Pointer - Medical Cross */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] text-cyan-400 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <Plus strokeWidth={4} className="w-4 h-4" />
      </motion.div>
      
      {/* Trailing Bio-Scanner Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Rotating Dashed Ring */}
        <motion.div
          className="absolute border border-dashed border-cyan-500/40 rounded-full"
          style={{
            width: 40,
            height: 40,
          }}
          animate={{
            rotate: 360,
            scale: isHovered ? 1.5 : 1,
            borderColor: isHovered ? 'rgba(6, 182, 212, 0.8)' : 'rgba(6, 182, 212, 0.4)',
          }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.2 },
          }}
        />

        {/* Inner Pulse Ring (Active on Hover) */}
        <motion.div
          className="absolute border border-cyan-400 rounded-full opacity-0"
          animate={{
            width: isHovered ? 40 : 20,
            height: isHovered ? 40 : 20,
            opacity: isHovered ? [0, 0.5, 0] : 0,
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{
            opacity: { duration: 1, repeat: Infinity },
            width: { duration: 0.2 },
            height: { duration: 0.2 },
          }}
        />

        {/* Target Brackets (Visible on Hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.8, rotate: 45 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 0 }}
              className="absolute w-8 h-8 border-2 border-cyan-500/30"
              style={{ borderRadius: '8px' }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CustomCursor;
