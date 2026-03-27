import cn from 'clsx';

type Severity = 'critical' | 'high' | 'medium' | 'low';

const config: Record<Severity, { bg: string; border: string; text: string; label: string }> = {
  critical: { bg: 'rgba(239,68,68,0.10)', border: 'rgba(239,68,68,0.30)', text: '#EF4444', label: 'CRITICAL' },
  high:     { bg: 'rgba(249,115,22,0.10)', border: 'rgba(249,115,22,0.30)', text: '#F97316', label: 'HIGH' },
  medium:   { bg: 'rgba(234,179,8,0.10)',  border: 'rgba(234,179,8,0.30)',  text: '#EAB308', label: 'MEDIUM' },
  low:      { bg: 'rgba(99,102,241,0.10)', border: 'rgba(99,102,241,0.30)', text: '#6366F1', label: 'LOW' },
};

interface SeverityPillProps {
  severity: Severity;
  className?: string;
}

export const SeverityPill = ({ severity, className }: SeverityPillProps) => {
  const c = config[severity];
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium', className)}
      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
    >
      {severity === 'critical' && (
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: c.text, animation: 'blink 1.2s step-start infinite' }}
        />
      )}
      {c.label}
    </span>
  );
};

export default SeverityPill;
