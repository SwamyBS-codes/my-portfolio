import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorEffect = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-40);
  const y = useMotionValue(-40);
  const trailX = useSpring(x, { stiffness: 100, damping: 18, mass: 0.45 });
  const trailY = useSpring(y, { stiffness: 100, damping: 18, mass: 0.45 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    if (!finePointer.matches) return undefined;

    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setHovering(Boolean(event.target?.closest?.('a, button, [role="button"]')));
    };
    const hide = () => setVisible(false);

    window.addEventListener('pointermove', handleMove, { passive: true });
    document.addEventListener('pointerleave', hide);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('pointerleave', hide);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={`cursor-trail ${visible ? 'is-visible' : ''} ${hovering ? 'is-hovering' : ''}`}
        style={{ x: trailX, y: trailY }}
      />
      <motion.div
        aria-hidden="true"
        className={`cursor-glow ${visible ? 'is-visible' : ''} ${hovering ? 'is-hovering' : ''}`}
        style={{ x, y }}
      />
    </>
  );
};

export default CursorEffect;
