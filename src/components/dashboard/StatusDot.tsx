interface StatusDotProps {
  status: 'online' | 'offline' | 'alert';
  size?: number;
}

export const StatusDot = ({ status, size = 8 }: StatusDotProps) => {
  if (status === 'online') {
    return (
      <span className="relative inline-flex" style={{ width: size, height: size }}>
        <span
          className="absolute inline-flex h-full w-full rounded-full"
          style={{
            background: '#00FF88',
            animation: 'pulse-ring 2s ease-out infinite',
            opacity: 0.6,
          }}
        />
        <span
          className="relative inline-flex rounded-full"
          style={{ width: size, height: size, background: '#00FF88' }}
        />
      </span>
    );
  }
  if (status === 'alert') {
    return (
      <span
        className="inline-flex rounded-full"
        style={{
          width: size,
          height: size,
          background: '#EF4444',
          animation: 'blink 1.2s step-start infinite',
        }}
      />
    );
  }
  return (
    <span
      className="inline-flex rounded-full"
      style={{ width: size, height: size, background: '#444444' }}
    />
  );
};

export default StatusDot;
