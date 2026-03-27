import { motion } from 'framer-motion';

interface SkeletonCardProps {
  height?: number;
  index?: number;
}

export const SkeletonCard = ({ height = 120, index = 0 }: SkeletonCardProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: [0.3, 0.7, 0.3] }}
    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.08 }}
    className="rounded-xl"
    style={{
      height,
      background: 'linear-gradient(90deg, #161616 0%, #1A1A1A 50%, #161616 100%)',
      border: '1px solid rgba(255,255,255,0.05)',
    }}
  />
);

export default SkeletonCard;
