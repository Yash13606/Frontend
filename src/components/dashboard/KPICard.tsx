import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface KPICardProps {
  label: string;
  value: number;
  valueDisplay?: string; // formatted string like "3,847" or custom suffix
  delta?: string;
  deltaType?: 'up' | 'down' | 'neutral';
  subLabel?: string;
  showProgress?: boolean;
  progressValue?: number; // 0-100
  valueColor?: string;
  children?: ReactNode;
  index?: number; // for stagger delay
}

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>();
  const startRef = useRef<number>();

  useEffect(() => {
    startRef.current = undefined;
    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease: cubic-bezier(0.16, 1, 0.3, 1) approximate
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return count;
}

export const KPICard = ({
  label,
  value,
  valueDisplay,
  delta,
  deltaType = 'up',
  subLabel,
  showProgress,
  progressValue,
  valueColor,
  children,
  index = 0,
}: KPICardProps) => {
  const countedValue = useCountUp(value);
  const displayValue = valueDisplay ?? countedValue.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.06 }}
      whileHover={{ scale: 1.005 }}
      className="relative rounded-xl p-5 cursor-default group transition-all duration-150"
      style={{
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,255,136,0.40)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 20px rgba(0,255,136,0.15)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      <p className="text-[11px] font-medium tracking-[0.12em] uppercase mb-3" style={{ color: '#444444' }}>
        {label}
      </p>
      <p className="text-[32px] font-bold leading-none mb-2" style={{ color: valueColor ?? '#FFFFFF' }}>
        {displayValue}
      </p>
      {subLabel && (
        <p className="text-[13px] mb-2" style={{ color: '#888888' }}>{subLabel}</p>
      )}
      {delta && (
        <p className="text-[12px] mb-2" style={{ color: deltaType === 'down' ? '#EF4444' : '#00FF88' }}>
          {deltaType === 'up' ? '↑' : deltaType === 'down' ? '↓' : ''} {delta}
        </p>
      )}
      {showProgress && progressValue !== undefined && (
        <div className="mt-3 h-1 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressValue}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            className="h-1 rounded-full"
            style={{ background: '#00FF88' }}
          />
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default KPICard;
