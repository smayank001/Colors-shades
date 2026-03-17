import { motion } from 'framer-motion';

interface FloatingShapeProps {
  color: string;
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  shape?: 'circle' | 'blob';
}

export function FloatingShape({ color, size, top, left, right, bottom, delay = 0, shape = 'circle' }: FloatingShapeProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, left, right, bottom }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {shape === 'circle' ? (
        <div
          className="rounded-full opacity-20"
          style={{ width: size, height: size, backgroundColor: color }}
        />
      ) : (
        <svg width={size} height={size} viewBox="0 0 200 200" className="opacity-20">
          <path
            d="M44.7,-76.4C58.8,-69.2,71.8,-58.8,79.6,-45.2C87.4,-31.6,90,-14.8,88.2,1.0C86.4,16.9,80.1,31.7,71.5,44.8C62.9,57.9,52,69.3,38.8,76.5C25.6,83.7,10,86.8,-4.8,83.9C-19.6,81,-39.2,72.2,-53.4,60.1C-67.6,48,-76.4,32.6,-80.8,15.9C-85.2,-0.8,-85.2,-18.8,-78.7,-33.7C-72.2,-48.6,-59.2,-60.4,-44.6,-67.3C-30,-74.2,-13.7,-76.2,1.3,-78.4C16.4,-80.6,30.6,-83.6,44.7,-76.4Z"
            fill={color}
            transform="translate(100 100)"
          />
        </svg>
      )}
    </motion.div>
  );
}
