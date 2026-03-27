import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { KPICard } from '@/components/dashboard/KPICard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { useDashboardStore } from '@/store/dashboardStore';
import { footfallData, heatmapZones, demographics } from '@/data/mockData';

const CHART_TOOLTIP = {
  contentStyle: { background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.30)', borderRadius: 8 },
  labelStyle: { color: '#888', fontSize: 12 },
  itemStyle: { color: '#FFF', fontSize: 13 },
};

const PIE_COLORS = ['#FFFFFF', 'rgba(255,255,255,0.35)'];

function intensityToColor(v: number) {
  const p = v / 100;
  return `rgba(255,255,255,${0.07 + p * 0.80})`;
}

export default function CustomerAnalytics() {
  const { selectedStore } = useDashboardStore();
  const storeSuffix = selectedStore === 'all' ? '' : ` — ${selectedStore[0].toUpperCase() + selectedStore.slice(1)}`;
  const peakEntry = [...footfallData].sort((a, b) => b.count - a.count)[0];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase mb-1" style={{ color: '#FFFFFF' }}>● CUSTOMER ANALYTICS</p>
        <h1 className="text-[28px] font-bold text-white">Customer Analytics{storeSuffix}</h1>
        <p className="text-[14px] mt-1" style={{ color: '#888' }}>Footfall, dwell time, and demographic insights</p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <KPICard label="Total Footfall Today" value={3847} delta="12% vs yesterday" deltaType="up" index={0} />
        <KPICard label="Peak Hour" value={741} valueDisplay={`${peakEntry?.hour} (${peakEntry?.count?.toLocaleString()})`} index={1} />
        <KPICard label="Avg Dwell Time" value={84} valueDisplay="8.4 min" delta="1.2 min vs yesterday" deltaType="up" index={2} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <ChartCard title="Footfall by Hour" index={3}>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={footfallData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="caGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="hour" tick={{ fill: '#444', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#444', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} />
              <Area type="monotone" dataKey="count" stroke="#FFFFFF" strokeWidth={2} fill="url(#caGrad)"
                dot={false} activeDot={{ r: 4, fill: '#FFFFFF', stroke: 'rgba(255,255,255,0.4)', strokeWidth: 6 }}
                animationBegin={200} animationDuration={800} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Zone Heatmap */}
        <ChartCard title="Zone Heat Map" index={4}>
          <div className="grid grid-cols-4 gap-2">
            {heatmapZones.map(zone => {
              const textDark = zone.intensity > 55;
              return (
                <motion.div
                  key={zone.zone}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: zone.x * 0.05 + zone.y * 0.08 }}
                  className="rounded-lg p-2.5 flex flex-col"
                  style={{
                    background: intensityToColor(zone.intensity),
                    border: '1px solid rgba(255,255,255,0.15)',
                    minHeight: 58,
                  }}
                >
                  <span className="text-[10px] font-medium leading-tight" style={{ color: textDark ? 'rgba(0,0,0,0.7)' : '#555' }}>
                    {zone.zone}
                  </span>
                  <span className="text-[18px] font-bold mt-auto" style={{ color: textDark ? 'rgba(0,0,0,0.85)' : '#FFFFFF' }}>
                    {zone.intensity}%
                  </span>
                </motion.div>
              );
            })}
          </div>
        </ChartCard>
      </div>

      {/* Demographics Row */}
      <div className="grid grid-cols-2 gap-4">
        <ChartCard title="Demographics by Age Group" index={6}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={demographics} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="group" tick={{ fill: '#444', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#444', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP} />
              <Legend wrapperStyle={{ fontSize: 11 }} formatter={v => <span style={{ color: '#888' }}>{v}</span>} />
              <Bar dataKey="male" name="Male" fill="#FFFFFF" radius={[3, 3, 0, 0]} animationBegin={200} animationDuration={800} />
              <Bar dataKey="female" name="Female" fill="rgba(255,255,255,0.40)" radius={[3, 3, 0, 0]} animationBegin={200} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Gender Split" index={7}>
          <div className="flex items-center justify-center h-[220px]">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={[{ name: 'Female', value: 54 }, { name: 'Male', value: 46 }]}
                  cx="50%" cy="50%"
                  innerRadius="55%" outerRadius="80%"
                  dataKey="value"
                  animationBegin={200} animationDuration={800}
                >
                  {PIE_COLORS.map((color, i) => <Cell key={i} fill={color} />)}
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
