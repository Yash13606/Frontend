import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  rightLabel?: ReactNode;
  index?: number;
}

export const ChartCard = ({ title, children, rightLabel, index = 0 }: ChartCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.06 }}
    className="rounded-xl p-5 transition-all duration-150 group"
    style={{
      background: '#111111',
      border: '1px solid rgba(255,255,255,0.08)',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.25)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 20px rgba(255,255,255,0.08)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
    }}
  >
    <div className="flex items-center justify-between mb-4">
      <p className="text-[11px] font-medium tracking-[0.12em] uppercase" style={{ color: '#FFFFFF' }}>
        {title}
      </p>
      {rightLabel && <div>{rightLabel}</div>}
    </div>
    {children}
  </motion.div>
);

export default ChartCard;
