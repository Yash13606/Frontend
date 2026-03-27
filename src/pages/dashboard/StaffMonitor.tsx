import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { KPICard } from '@/components/dashboard/KPICard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { useDashboardStore } from '@/store/dashboardStore';
import { staff } from '@/data/mockData';

const CHART_TOOLTIP = {
  contentStyle: { background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.30)', borderRadius: 8 },
  labelStyle: { color: '#888', fontSize: 12 },
  itemStyle: { color: '#FFF', fontSize: 13 },
};

export default function StaffMonitor() {
  const { selectedStore } = useDashboardStore();

  const filteredStaff = staff.filter(s =>
    selectedStore === 'all' || s.storeId === selectedStore
  );

  const avgCompliance = Math.round(filteredStaff.reduce((acc, s) => acc + s.compliance, 0) / filteredStaff.length);
  const totalConversions = filteredStaff.reduce((acc, s) => acc + s.conversions, 0);

  const complianceData = filteredStaff.map(s => ({
    name: s.name.split(' ')[0],
    compliance: s.compliance,
  }));

  const idleData = [...filteredStaff]
    .sort((a, b) => b.idleMinutes - a.idleMinutes)
    .slice(0, 5)
    .map(s => ({ name: s.name.split(' ')[0], idleMinutes: s.idleMinutes }));

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase mb-1" style={{ color: '#FFFFFF' }}>● STAFF MONITOR</p>
        <h1 className="text-[28px] font-bold text-white">Staff Monitor</h1>
        <p className="text-[14px] mt-1" style={{ color: '#888' }}>Zone coverage, compliance, and workforce productivity</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <KPICard label="Staff on Floor" value={filteredStaff.length} valueDisplay={`${filteredStaff.length}/28`} showProgress progressValue={Math.round((filteredStaff.length / 28) * 100)} index={0} />
        <KPICard label="Avg Compliance" value={avgCompliance} valueDisplay={`${avgCompliance}%`} delta="3% vs yesterday" deltaType="up" index={1} />
        <KPICard label="Total Conversions Today" value={totalConversions} delta="8 vs yesterday" deltaType="up" index={2} />
      </div>

      {/* Staff Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.18 }}
        className="rounded-xl overflow-hidden mb-5"
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[11px] font-medium tracking-[0.12em] uppercase" style={{ color: '#FFFFFF' }}>STAFF PERFORMANCE</p>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {['ID', 'Name', 'Role', 'Zone', 'Compliance', 'Idle Time', 'Conversions', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-medium tracking-widest uppercase" style={{ color: '#444' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((s, i) => (
              <tr
                key={s.id}
                style={{
                  background: i % 2 === 0 ? '#111' : '#0D0D0D',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  borderLeft: s.status === 'flagged' ? '3px solid rgba(239,68,68,0.5)' : '3px solid transparent',
                }}
              >
                <td className="px-4 py-3 text-[12px]" style={{ color: '#555' }}>{s.id}</td>
                <td className="px-4 py-3 text-[13px] font-medium" style={{ color: '#CCC' }}>{s.name}</td>
                <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{s.role}</td>
                <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{s.zone}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-black/30">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${s.compliance}%`,
                          background: s.compliance < 70 ? '#EF4444' : '#FFFFFF',
                        }}
                      />
                    </div>
                    <span className="text-[12px]" style={{ color: s.compliance < 70 ? '#EF4444' : '#888' }}>{s.compliance}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[13px]" style={{ color: s.idleMinutes > 15 ? '#F97316' : '#888' }}>{s.idleMinutes} min</td>
                <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{s.conversions}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full"
                    style={{
                      color: s.status === 'flagged' ? '#EF4444' : '#FFFFFF',
                      background: s.status === 'flagged' ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.10)',
                    }}>
                    {s.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Compliance Distribution" index={5}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={complianceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#444', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#444', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} />
              <Bar dataKey="compliance" radius={[3, 3, 0, 0]} animationBegin={200} animationDuration={800}>
                {complianceData.map((entry, i) => (
                  <Cell key={i} fill={entry.compliance < 70 ? '#EF4444' : '#FFFFFF'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Idle Time" index={6}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={idleData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#444', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#888', fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip {...CHART_TOOLTIP} />
              <Bar dataKey="idleMinutes" radius={[0, 4, 4, 0]} animationBegin={200} animationDuration={800}>
                {idleData.map((entry, i) => (
                  <Cell key={i} fill={entry.idleMinutes > 15 ? '#EF4444' : '#F97316'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
