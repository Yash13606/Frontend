import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { SeverityPill } from '@/components/dashboard/SeverityPill';
import { useDashboardStore } from '@/store/dashboardStore';
import { alerts, stores } from '@/data/mockData';

const severities = ['All', 'Critical', 'High', 'Medium', 'Low'];
const modules = ['All Modules', 'Loss Prevention', 'Fire & Safety', 'Staff Monitor', 'People Re-ID', 'Customer Analytics'];

const statusConfig: Record<string, { color: string; label: string }> = {
  active:        { color: '#EF4444', label: 'ACTIVE' },
  investigating: { color: '#EAB308', label: 'INVEST.' },
  resolved:      { color: '#444',    label: 'RESOLVED' },
};

const severitySummary = [
  { sev: 'Critical', color: '#EF4444', filter: 'critical' },
  { sev: 'High',     color: '#F97316', filter: 'high' },
  { sev: 'Medium',   color: '#EAB308', filter: 'medium' },
  { sev: 'Low',      color: '#6366F1', filter: 'low' },
];

export default function AlertsCenter() {
  const { selectedStore, setSelectedStore } = useDashboardStore();
  const [sevFilter, setSevFilter] = useState('All');
  const [moduleFilter, setModuleFilter] = useState('All Modules');
  const [storeFilter, setStoreFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set(alerts.filter(a => a.status === 'resolved').map(a => a.id)));

  const filtered = useMemo(() => {
    return alerts.filter(a => {
      const matchStore = storeFilter === 'all' || a.storeId === storeFilter;
      const matchSev = sevFilter === 'All' || a.severity === sevFilter.toLowerCase();
      const matchMod = moduleFilter === 'All Modules' || a.module === moduleFilter;
      const matchSearch = search === '' || a.description.toLowerCase().includes(search.toLowerCase()) || a.type.toLowerCase().includes(search.toLowerCase());
      return matchStore && matchSev && matchMod && matchSearch;
    });
  }, [storeFilter, sevFilter, moduleFilter, search]);

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase mb-1" style={{ color: '#00FF88' }}>● ALERTS CENTER</p>
        <h1 className="text-[28px] font-bold text-white">Alerts Center</h1>
        <p className="text-[14px] mt-1" style={{ color: '#888' }}>Manage and triage all security and operational alerts</p>
      </motion.div>

      {/* Filter Bar */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }}
        className="rounded-xl p-4 mb-4 flex flex-wrap gap-3 items-center"
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {/* Severity Pills */}
        <div className="flex gap-2 flex-wrap">
          {severities.map(s => (
            <button
              key={s}
              onClick={() => setSevFilter(s)}
              className="px-3 py-1 rounded-full text-[11px] font-medium transition-all"
              style={{
                background: sevFilter === s ? 'rgba(0,255,136,0.15)' : 'transparent',
                color: sevFilter === s ? '#00FF88' : '#555',
                border: `1px solid ${sevFilter === s ? 'rgba(0,255,136,0.40)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Module Dropdown */}
        <select
          value={moduleFilter}
          onChange={e => setModuleFilter(e.target.value)}
          className="rounded-lg px-3 py-1.5 text-[12px] outline-none"
          style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)', color: '#888' }}
        >
          {modules.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        {/* Store Dropdown */}
        <select
          value={storeFilter}
          onChange={e => setStoreFilter(e.target.value)}
          className="rounded-lg px-3 py-1.5 text-[12px] outline-none"
          style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)', color: '#888' }}
        >
          <option value="all">All Stores</option>
          {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 flex-1 min-w-[180px]"
          style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.08)' }}>
          <Search size={12} style={{ color: '#444' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search alerts..."
            className="bg-transparent text-[12px] outline-none flex-1 min-w-0"
            style={{ color: '#FFF' }}
          />
        </div>
      </motion.div>

      {/* Summary Row */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {severitySummary.map(({ sev, color, filter }, i) => (
          <motion.div
            key={sev}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 + i * 0.05 }}
            onClick={() => setSevFilter(sev)}
            className="rounded-xl p-4 cursor-pointer transition-all"
            style={{ background: '#111', border: `1px solid ${sevFilter === sev ? color + '44' : 'rgba(255,255,255,0.06)'}` }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = color + '55'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = sevFilter === sev ? color + '44' : 'rgba(255,255,255,0.06)'}
          >
            <p className="text-[11px] tracking-widest uppercase mb-1" style={{ color: '#444' }}>{sev}</p>
            <p className="text-[28px] font-bold" style={{ color }}>
              {alerts.filter(a => a.severity === filter).length}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Alerts Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="rounded-xl overflow-hidden"
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {['#', 'Severity', 'Module', 'Type', 'Description', 'Store', 'Time', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-3 py-3 text-left text-[10px] font-medium tracking-widest uppercase" style={{ color: '#444' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-[13px]" style={{ color: '#444' }}>
                  No alerts match your filters
                </td>
              </tr>
            )}
            {filtered.map((alert, i) => {
              const isResolved = resolvedIds.has(alert.id);
              const sc = statusConfig[isResolved ? 'resolved' : alert.status] ?? statusConfig.active;
              return (
                <tr
                  key={alert.id}
                  style={{
                    opacity: isResolved ? 0.45 : 1,
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: i % 2 === 0 ? '#111' : '#0D0D0D',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = i % 2 === 0 ? '#111' : '#0D0D0D'}
                >
                  <td className="px-3 py-3 text-[12px]" style={{ color: '#444' }}>{i + 1}</td>
                  <td className="px-3 py-3"><SeverityPill severity={alert.severity as 'critical'|'high'|'medium'|'low'} /></td>
                  <td className="px-3 py-3 text-[12px]" style={{ color: '#888' }}>{alert.module}</td>
                  <td className="px-3 py-3 text-[12px] font-medium" style={{ color: '#CCC' }}>{alert.type}</td>
                  <td className="px-3 py-3 text-[12px] max-w-[180px] truncate" style={{ color: '#888', textDecoration: isResolved ? 'line-through' : 'none' }}>{alert.description}</td>
                  <td className="px-3 py-3 text-[12px] capitalize" style={{ color: '#666' }}>{alert.storeId}</td>
                  <td className="px-3 py-3 text-[12px]" style={{ color: '#444' }}>{alert.timestamp}</td>
                  <td className="px-3 py-3">
                    <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full"
                      style={{ color: sc.color, background: `${sc.color}18` }}>
                      {sc.label}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button className="text-[11px] font-semibold hover:opacity-80" style={{ color: '#00FF88' }}>Assign →</button>
                      {!isResolved && (
                        <button
                          onClick={() => setResolvedIds(prev => new Set([...prev, alert.id]))}
                          className="text-[11px] font-semibold hover:opacity-80"
                          style={{ color: '#666' }}
                        >
                          Resolve ✓
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
