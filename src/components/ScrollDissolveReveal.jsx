import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function ScrollDissolveReveal({ as = 'div', className = '', children, ...props }) {
  const sectionRef = useRef(null);
  const MotionElement = motion[as] || motion.div;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    mass: 0.4
  });

  const opacity = useTransform(progress, [0, 0.12, 0.88, 1], [0.15, 1, 1, 0.35]);
  const scale = useTransform(progress, [0, 0.12, 0.88, 1], [0.97, 1, 1, 0.985]);
  const y = useTransform(progress, [0, 0.12, 0.88, 1], [32, 0, 0, -16]);

  return (
    <MotionElement
      ref={sectionRef}
      className={className}
      style={{ opacity, scale, y }}
      {...props}
    >
      {children}
    </MotionElement>
  );
}