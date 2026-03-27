import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { KPICard } from '@/components/dashboard/KPICard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { StatusDot } from '@/components/dashboard/StatusDot';
import { useDashboardStore } from '@/store/dashboardStore';
import { cameras, alerts, incidentTrend } from '@/data/mockData';

const CHART_TOOLTIP = {
  contentStyle: { background: '#1A1A1A', border: '1px solid rgba(0,255,136,0.30)', borderRadius: 8 },
  labelStyle: { color: '#888', fontSize: 12 },
  itemStyle: { color: '#FFF', fontSize: 13 },
};

export default function FireSafety() {
  const { selectedStore } = useDashboardStore();

  const filteredCameras = cameras.filter(c =>
    selectedStore === 'all' || c.storeId === selectedStore
  );

  const fireAlerts = alerts.filter(a =>
    a.module === 'Fire & Safety' &&
    (selectedStore === 'all' || a.storeId === selectedStore)
  );

  const hasFireAlert = (cameraId: string) => fireAlerts.some(a => a.cameraId === cameraId);
  const fireToday = fireAlerts.filter(a => a.type === 'Fire Alert').length;
  const thermalAlerts = fireAlerts.filter(a => a.type === 'Thermal Anomaly').length;

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase mb-1" style={{ color: '#00FF88' }}>● FIRE & SAFETY</p>
        <h1 className="text-[28px] font-bold text-white">Fire & Safety</h1>
        <p className="text-[14px] mt-1" style={{ color: '#888' }}>97%+ accurate fire detection and thermal monitoring</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <KPICard label="Fire Alerts Today" value={Math.max(fireToday, 1)} valueColor={fireToday > 0 ? '#EF4444' : '#FFF'} index={0} />
        <KPICard label="Thermal Anomalies" value={Math.max(thermalAlerts, 2)} valueColor={thermalAlerts > 0 ? '#F97316' : '#FFF'} index={1} />
        <KPICard label="False Alarm Rate" value={3} valueDisplay="< 3%" delta="Within threshold" deltaType="up" index={2} />
      </div>

      {/* Camera Status Grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.18 }}
        className="rounded-xl p-5 mb-5"
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase mb-4" style={{ color: '#00FF88' }}>CAMERA STATUS GRID</p>
        <div className="grid grid-cols-3 gap-3">
          {filteredCameras.map((cam, i) => {
            const hasAlert = hasFireAlert(cam.id);
            const status = hasAlert ? 'alert' : cam.status as 'online' | 'offline';
            return (
              <motion.div
                key={cam.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="rounded-xl p-4"
                style={{
                  background: hasAlert ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${hasAlert ? 'rgba(239,68,68,0.30)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-[13px] font-medium" style={{ color: '#CCC' }}>{cam.name}</p>
                  <StatusDot status={status} />
                </div>
                <p className="text-[11px]" style={{ color: '#555' }}>{cam.zone}</p>
                {hasAlert && (
                  <p className="text-[10px] font-bold mt-2" style={{ color: '#EF4444' }}>⚠ THERMAL ANOMALY</p>
                )}
                <p className="text-[10px] mt-1" style={{ color: '#444' }}>Last ping: {cam.lastPing}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Alert Timeline — Last 7 Days" index={5}>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={incidentTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: '#444', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#444', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} />
              <Legend wrapperStyle={{ fontSize: 11 }} formatter={v => <span style={{ color: '#888' }}>{v}</span>} />
              <Line type="monotone" dataKey="fire" stroke="#EF4444" strokeWidth={2} dot={false} name="Fire" animationBegin={200} animationDuration={800} />
              <Line type="monotone" dataKey="theft" stroke="#F97316" strokeWidth={2} dot={false} name="Thermal" animationBegin={200} animationDuration={800} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="False Alarm vs Real Alerts" index={6}>
          <div className="flex items-center justify-center h-[200px]">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={[{ name: 'Real Alerts', value: 97 }, { name: 'False Alarms', value: 3 }]}
                  cx="50%" cy="50%"
                  innerRadius="50%" outerRadius="75%"
                  dataKey="value"
                  animationBegin={200} animationDuration={800}
                >
                  <Cell fill="#00FF88" />
                  <Cell fill="rgba(255,255,255,0.08)" />
                </Pie>
                <Tooltip {...CHART_TOOLTIP} />
                <Legend
                  formatter={v => <span style={{ color: '#888', fontSize: 12 }}>{v}</span>}
                  iconType="circle" iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
