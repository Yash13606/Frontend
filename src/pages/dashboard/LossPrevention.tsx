import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { KPICard } from '@/components/dashboard/KPICard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { SeverityPill } from '@/components/dashboard/SeverityPill';
import { useDashboardStore } from '@/store/dashboardStore';
import { alerts, cameras } from '@/data/mockData';

const CHART_TOOLTIP = {
  contentStyle: { background: '#1A1A1A', border: '1px solid rgba(0,255,136,0.30)', borderRadius: 8 },
  labelStyle: { color: '#888', fontSize: 12 },
  itemStyle: { color: '#FFF', fontSize: 13 },
};

const alertFilters = ['All', 'Concealment', 'POS Fraud', 'Loitering', 'Unauthorized'];

export default function LossPrevention() {
  const { selectedStore } = useDashboardStore();
  const [activeFilter, setActiveFilter] = useState('All');

  const lpAlerts = alerts.filter(a =>
    a.module === 'Loss Prevention' &&
    (selectedStore === 'all' || a.storeId === selectedStore)
  );

  const filteredAlerts = activeFilter === 'All'
    ? lpAlerts
    : lpAlerts.filter(a => a.type.toLowerCase().includes(activeFilter.toLowerCase()));

  const activeCount = lpAlerts.filter(a => a.status === 'active').length;
  const weeklyCount = 18;
  const posFlags = lpAlerts.filter(a => a.type.includes('POS')).length;

  const severityData = [
    { name: 'Critical', count: lpAlerts.filter(a => a.severity === 'critical').length, color: '#EF4444' },
    { name: 'High', count: lpAlerts.filter(a => a.severity === 'high').length, color: '#F97316' },
    { name: 'Medium', count: lpAlerts.filter(a => a.severity === 'medium').length, color: '#EAB308' },
    { name: 'Low', count: lpAlerts.filter(a => a.severity === 'low').length, color: '#6366F1' },
  ];

  const cameraIncidents = cameras
    .filter(c => selectedStore === 'all' || c.storeId === selectedStore)
    .map(cam => ({
      ...cam,
      incidents: alerts.filter(a => a.cameraId === cam.id && a.module === 'Loss Prevention').length,
      lastIncident: alerts.find(a => a.cameraId === cam.id && a.module === 'Loss Prevention')?.timestamp ?? 'None',
    }));

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase mb-1" style={{ color: '#00FF88' }}>● LOSS PREVENTION</p>
        <h1 className="text-[28px] font-bold text-white">Loss Prevention</h1>
        <p className="text-[14px] mt-1" style={{ color: '#888' }}>AI-powered theft detection and incident management</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <KPICard label="Active Theft Alerts" value={activeCount} valueColor="#EF4444" index={0} />
        <KPICard label="Incidents This Week" value={weeklyCount} delta="8% vs last week" deltaType="up" index={1} />
        <KPICard label="POS Fraud Flags" value={posFlags} valueColor={posFlags > 0 ? '#EF4444' : '#FFF'} index={2} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        {/* Filterable Alert List */}
        <ChartCard title="Theft Alerts" index={3}>
          <div className="flex gap-2 flex-wrap mb-4">
            {alertFilters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-3 py-1 rounded-full text-[11px] font-medium transition-all"
                style={{
                  background: activeFilter === f ? 'rgba(0,255,136,0.15)' : 'transparent',
                  color: activeFilter === f ? '#00FF88' : '#555',
                  border: `1px solid ${activeFilter === f ? 'rgba(0,255,136,0.40)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="space-y-2 overflow-y-auto max-h-[280px]">
            {filteredAlerts.length === 0 && (
              <p className="text-center py-8 text-[13px]" style={{ color: '#444' }}>No alerts match this filter</p>
            )}
            {filteredAlerts.map(alert => (
              <div
                key={alert.id}
                className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  borderLeft: alert.severity === 'critical' ? '3px solid #EF4444' : '3px solid transparent',
                  border: `1px solid rgba(255,255,255,0.06)`,
                }}
              >
                <SeverityPill severity={alert.severity as 'critical'|'high'|'medium'|'low'} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium truncate" style={{ color: '#CCC' }}>{alert.type}</p>
                  <p className="text-[11px]" style={{ color: '#555' }}>{alert.cameraId} · {alert.timestamp}</p>
                </div>
                <button className="text-[11px] font-semibold shrink-0" style={{ color: '#00FF88' }}>Assign</button>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Severity Breakdown */}
        <ChartCard title="Severity Breakdown" index={4}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={severityData} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#444', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip {...CHART_TOOLTIP} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} animationBegin={200} animationDuration={800}>
                {severityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Camera Incident Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="rounded-xl overflow-hidden"
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[11px] font-medium tracking-[0.12em] uppercase" style={{ color: '#00FF88' }}>CAMERA INCIDENT COUNT</p>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {['Camera', 'Zone', 'Incidents Today', 'Last Incident', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-medium tracking-widest uppercase" style={{ color: '#444' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cameraIncidents.map((c, i) => (
              <tr key={c.id} style={{ background: i % 2 === 0 ? '#111' : '#0D0D0D', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td className="px-4 py-3 text-[13px]" style={{ color: '#CCC' }}>{c.name}</td>
                <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{c.zone}</td>
                <td className="px-4 py-3 text-[13px]" style={{ color: c.incidents > 0 ? '#EF4444' : '#888' }}>{c.incidents}</td>
                <td className="px-4 py-3 text-[13px]" style={{ color: '#555' }}>{c.lastIncident}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full"
                    style={{ color: c.status === 'online' ? '#00FF88' : '#EF4444', background: c.status === 'online' ? 'rgba(0,255,136,0.1)' : 'rgba(239,68,68,0.1)' }}>
                    {c.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
