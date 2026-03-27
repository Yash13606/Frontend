import { useState } from 'react';
import SeverityPill from './SeverityPill';

interface Alert {
  id: string;
  storeId: string;
  cameraId: string;
  module: string;
  type: string;
  severity: string;
  description: string;
  status: string;
  timestamp: string;
  assignedTo: string | null;
}

const statusConfig: Record<string, { color: string; label: string }> = {
  active:       { color: '#EF4444', label: 'ACTIVE' },
  investigating:{ color: '#EAB308', label: 'INVESTIGATING' },
  resolved:     { color: '#444', label: 'RESOLVED' },
};

interface AlertRowProps {
  alert: Alert;
  storeName?: string;
}

export const AlertRow = ({ alert, storeName }: AlertRowProps) => {
  const [resolved, setResolved] = useState(alert.status === 'resolved');
  const sc = statusConfig[resolved ? 'resolved' : alert.status] ?? statusConfig.active;

  return (
    <tr
      className="transition-colors"
      style={{
        opacity: resolved ? 0.45 : 1,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
      onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)'}
      onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
    >
      <td className="px-4 py-3">
        <SeverityPill severity={alert.severity as 'critical' | 'high' | 'medium' | 'low'} />
      </td>
      <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{alert.module}</td>
      <td className="px-4 py-3 text-[13px] max-w-[260px]" style={{ color: '#CCC', textDecoration: resolved ? 'line-through' : 'none' }}>
        {alert.description}
      </td>
      <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{storeName ?? alert.storeId}</td>
      <td className="px-4 py-3 text-[13px]" style={{ color: '#555' }}>{alert.timestamp}</td>
      <td className="px-4 py-3">
        <span
          className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full"
          style={{ color: sc.color, background: `${sc.color}18` }}
        >
          {sc.label}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            className="text-[11px] font-semibold transition-colors hover:opacity-80"
            style={{ color: '#00FF88' }}
          >
            Assign
          </button>
          {!resolved && (
            <button
              onClick={() => setResolved(true)}
              className="text-[11px] font-semibold transition-colors hover:opacity-80"
              style={{ color: '#888' }}
            >
              Resolve ✓
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default AlertRow;
