import { useState } from 'react';
import { motion } from 'framer-motion';
import { generatedReports, stores } from '@/data/mockData';

const reportTypes = ['Footfall', 'Theft', 'Staff', 'Fire', 'Full'];

const typeColors: Record<string, { color: string; bg: string }> = {
  Footfall: { color: '#00FF88', bg: 'rgba(0,255,136,0.10)' },
  Theft:    { color: '#EF4444', bg: 'rgba(239,68,68,0.10)' },
  Staff:    { color: '#6366F1', bg: 'rgba(99,102,241,0.10)' },
  Fire:     { color: '#F97316', bg: 'rgba(249,115,22,0.10)' },
  Full:     { color: '#EAB308', bg: 'rgba(234,179,8,0.10)' },
};

const inputStyle = {
  background: '#161616',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#FFF',
  borderRadius: 8,
  padding: '8px 12px',
  fontSize: 13,
  outline: 'none',
  width: '100%',
};

export default function Reports() {
  const [dateRange, setDateRange] = useState('');
  const [reportStore, setReportStore] = useState('all');
  const [reportType, setReportType] = useState('Full');
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerated(true);
    setTimeout(() => setGenerated(false), 3000);
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase mb-1" style={{ color: '#00FF88' }}>● REPORTS</p>
        <h1 className="text-[28px] font-bold text-white">Reports</h1>
        <p className="text-[14px] mt-1" style={{ color: '#888' }}>Generate and download intelligence reports for all modules</p>
      </motion.div>

      {/* Generate Report Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="rounded-xl p-6 mb-6"
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase mb-5" style={{ color: '#00FF88' }}>GENERATE NEW REPORT</p>
        <div className="grid grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-[11px] font-medium mb-2" style={{ color: '#555' }}>Date Range</label>
            <input
              type="text"
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              placeholder="e.g. Mar 1 - Mar 27"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium mb-2" style={{ color: '#555' }}>Store</label>
            <select value={reportStore} onChange={e => setReportStore(e.target.value)} style={inputStyle}>
              <option value="all">All Stores</option>
              {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-medium mb-2" style={{ color: '#555' }}>Report Type</label>
            <select value={reportType} onChange={e => setReportType(e.target.value)} style={inputStyle}>
              {reportTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button
            onClick={handleGenerate}
            className="rounded-lg py-2 px-4 text-[13px] font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{
              background: generated ? 'rgba(0,255,136,0.20)' : 'rgba(0,255,136,0.15)',
              border: '1px solid rgba(0,255,136,0.40)',
              color: '#00FF88',
            }}
          >
            {generated ? '✓ Report Queued' : 'Generate Report →'}
          </button>
        </div>
      </motion.div>

      {/* Generated Reports List */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="rounded-xl overflow-hidden"
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[11px] font-medium tracking-[0.12em] uppercase" style={{ color: '#00FF88' }}>GENERATED REPORTS</p>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {['Report Name', 'Type', 'Store', 'Date Range', 'Generated At', 'Size', 'Download'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-medium tracking-widest uppercase" style={{ color: '#444' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {generatedReports.map((r, i) => {
              const tc = typeColors[r.type] ?? typeColors.Full;
              return (
                <tr key={i} style={{ background: i % 2 === 0 ? '#111' : '#0D0D0D', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td className="px-4 py-3 text-[13px] font-medium" style={{ color: '#CCC' }}>{r.name}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full"
                      style={{ color: tc.color, background: tc.bg }}>
                      {r.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{r.store}</td>
                  <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{r.dateRange}</td>
                  <td className="px-4 py-3 text-[13px]" style={{ color: '#666' }}>{r.generatedAt}</td>
                  <td className="px-4 py-3 text-[12px]" style={{ color: '#555' }}>{r.size}</td>
                  <td className="px-4 py-3">
                    <button
                      className="text-[12px] font-semibold hover:opacity-80 transition-opacity"
                      style={{ color: '#00FF88' }}
                    >
                      ↓ Download
                    </button>
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
