export const LiveBadge = () => (
  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase"
    style={{ color: '#00FF88' }}>
    <span
      className="inline-block h-1.5 w-1.5 rounded-full"
      style={{ background: '#00FF88', animation: 'blink 1.2s step-start infinite' }}
    />
    LIVE
  </span>
);

export default LiveBadge;
