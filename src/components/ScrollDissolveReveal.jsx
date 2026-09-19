import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ScrollDissolveReveal({ as = 'div', className = '', children, ...props }) {
  const sectionRef = useRef(null);
  const MotionElement = motion[as] || motion.div;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 });
  const opacity = useTransform(progress, [0, 0.16, 0.52, 0.86, 1], [0, 1, 1, 0.92, 0.28]);
  const scale = useTransform(progress, [0, 0.16, 0.86, 1], [0.96, 1, 1, 0.985]);
  const y = useTransform(progress, [0, 0.16, 0.86, 1], [42, 0, 0, -18]);
  const blur = useTransform(progress, [0, 0.16, 0.86, 1], (value) => `blur(${value}px)`);

  return (
    <MotionElement
      ref={sectionRef}
      className={className}
      style={{ opacity, scale, y, filter: blur }}
      {...props}
    >
      {children}
    </MotionElement>
  );
}