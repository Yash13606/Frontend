import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Clock, Download, AlertTriangle, Activity, Database, Server } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { alerts, footfallData, cameras } from '@/data/mockData';

// --- TACTICAL COMPONENTS ---

const TacticalCard = ({ children, className = '', title, icon: Icon, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`tactical-panel bracket-box flex flex-col ${className}`}
  >
    {(title || Icon) && (
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2d3440] bg-[#0a0c10]/50">
        {title && <h3 className="font-display font-semibold tracking-widest text-[11px] text-[#8c9baf] uppercase m-0 leading-none">{title}</h3>}
        {Icon && <Icon size={14} className="text-[#3b82f6]" />}
      </div>
    )}
    <div className="flex-1 p-5">
      {children}
    </div>
  </motion.div>
);

const TacticalMetric = ({ label, value, subtext, trend, positive, accentColor = '#3b82f6' }: any) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <span className="font-display text-[10px] font-bold text-[#8c9baf] uppercase tracking-[0.15em]">{label}</span>
      {trend && (
        <span className={`flex items-center text-[10px] font-bold tracking-wider ${positive ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
          {positive ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
          {trend}
        </span>
      )}
    </div>
    <div className="flex items-baseline gap-2">
      <span className="font-display text-[32px] font-semibold text-[#e2e8f0] leading-none" style={{ textShadow: `0 0 20px ${accentColor}40` }}>{value}</span>
      {subtext && <span className="text-[12px] text-[#8c9baf] font-medium">{subtext}</span>}
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function Overview() {
  const { selectedStore } = useDashboardStore();
  
  // Interactive States
  const [timeRange, setTimeRange] = useState('24H');
  const [isExporting, setIsExporting] = useState(false);
  const [hoveredAlert, setHoveredAlert] = useState<string | null>(null);
  
  const filteredAlerts = alerts.filter(a => selectedStore === 'all' || a.storeId === selectedStore);
  const filteredCameras = cameras.filter(c => selectedStore === 'all' || c.storeId === selectedStore);
  
  const activeAlerts = filteredAlerts.filter(a => a.status === 'active');
  const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;
  const onlineCount = filteredCameras.filter(c => c.status === 'online').length;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 1000); // Faux export interaction
  };

  return (
    <div className="min-h-[calc(100vh-80px)] p-6 space-y-6 max-w-[1600px] mx-auto">
      
      {/* ── HEADER ── */}
      <div className="flex justify-between items-end pb-4 border-b border-[#2d3440]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-2 w-2 rounded-sm bg-[#3b82f6] animate-pulse" />
            <span className="font-display text-[10px] font-bold tracking-[0.2em] text-[#3b82f6] uppercase">System Overview</span>
          </div>
          <h1 className="text-[28px] font-display font-semibold tracking-tight text-[#e2e8f0]">
            COMMAND CENTER
          </h1>
        </div>
        <div className="flex gap-2">
          {['1H', '24H', '7D'].map((range) => (
            <motion.button 
              key={range}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTimeRange(range)}
              className={`tactical-btn ${timeRange === range ? 'active' : ''}`}
            >
              {range}
            </motion.button>
          ))}
          <div className="w-px h-8 bg-[#2d3440] mx-2" />
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="tactical-btn flex items-center gap-2"
          >
            {isExporting ? <Activity size={12} className="animate-spin" /> : <Download size={12} />}
            {isExporting ? 'EXPORTING...' : 'EXPORT LOG'}
          </motion.button>
        </div>
      </div>

      {/* ── TOP METRICS ROW ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TacticalCard delay={0.1}>
          <TacticalMetric label="Global Footfall" value="12,482" subtext="INDIVIDUALS" trend="12.5%" positive={true} accentColor="#3b82f6" />
        </TacticalCard>
        <TacticalCard delay={0.2}>
           <TacticalMetric label="Active Threats" value={activeAlerts.length.toString()} subtext="UNRESOLVED" trend="2 NEW" positive={false} accentColor="#f97316" />
        </TacticalCard>
        <TacticalCard delay={0.3}>
           <TacticalMetric label="Uplink Status" value={`${onlineCount}/${filteredCameras.length}`} subtext="ONLINE" trend="100%" positive={true} accentColor="#10b981" />
        </TacticalCard>
        <TacticalCard delay={0.4}>
           <TacticalMetric label="Response Delta" value="4.2" subtext="MINUTES" trend="1.2m" positive={true} accentColor="#3b82f6" />
        </TacticalCard>
      </div>

      {/* ── MAIN CHARTS ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Telemetry Graph */}
        <TacticalCard className="col-span-2" title="Network Telemetry" icon={Activity} delay={0.5}>
          <div className="flex justify-end items-center mb-4 gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#3b82f6]" />
              <span className="font-display text-[10px] font-bold tracking-wider text-[#8c9baf] uppercase">Traffic Vol</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#f97316]" />
              <span className="font-display text-[10px] font-bold tracking-wider text-[#8c9baf] uppercase">Anomalies</span>
            </div>
          </div>
          
          <div className="h-[280px] w-full mt-2 relative">
            {/* Tactical Grid Overlay behind chart */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={footfallData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" axisLine={{ stroke: '#2d3440' }} tickLine={false} tick={{ fill: '#8c9baf', fontSize: 10, fontFamily: 'Chakra Petch' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8c9baf', fontSize: 10, fontFamily: 'Chakra Petch' }} dx={-10} />
                <RechartsTooltip 
                  cursor={{ stroke: '#4b5563', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ backgroundColor: '#0a0c10', border: '1px solid #3b82f6', borderRadius: 0, color: '#e2e8f0', fontFamily: 'Chakra Petch' }}
                  itemStyle={{ fontSize: 12, fontWeight: 600, color: '#3b82f6' }}
                  labelStyle={{ color: '#8c9baf', marginBottom: 4, fontSize: 10, letterSpacing: '0.1em' }}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} fill="url(#blueGrad)" activeDot={{ r: 4, fill: '#0a0c10', stroke: '#3b82f6', strokeWidth: 2 }} animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TacticalCard>

        {/* Right: Sector Scan / Node Health */}
        <div className="flex flex-col gap-6">
          <TacticalCard title="Sector Scan" icon={Activity} delay={0.6} className="h-48">
             <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
               {/* Radar Circle */}
               <div className="absolute w-[200px] h-[200px] rounded-full border border-[#2d3440] flex items-center justify-center">
                 <div className="w-[100px] h-[100px] rounded-full border border-[#2d3440]" />
                 <div className="absolute w-full h-[1px] bg-[#2d3440]" />
                 <div className="absolute h-full w-[1px] bg-[#2d3440]" />
                 
                 {/* Sweeper */}
                 <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#10b981]/40 to-transparent animate-sweep" style={{ transformOrigin: 'bottom right' }}></div>
                 
                 {/* Dots */}
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: 'spring' }} className="absolute top-[30%] left-[20%] w-1.5 h-1.5 bg-[#10b981] rounded-full shadow-[0_0_10px_#10b981]" />
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring' }} className="absolute bottom-[40%] right-[25%] w-1.5 h-1.5 bg-[#ef4444] rounded-full shadow-[0_0_10px_#ef4444]" />
               </div>
             </div>
          </TacticalCard>

          <TacticalCard title="Node Allocation" icon={Database} delay={0.7} className="flex-1">
             <div className="space-y-4 pt-2">
                {[
                  { label: "VPU PROCESSORS", val: "84%", bars: 8, active: 7, color: "#3b82f6" },
                  { label: "MEMORY POOL", val: "62%", bars: 8, active: 5, color: "#10b981" },
                  { label: "NEURAL THREADS", val: "95%", bars: 8, active: 8, color: "#f97316" },
                ].map((stat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-end">
                      <span className="font-display text-[10px] text-[#8c9baf] tracking-widest">{stat.label}</span>
                      <span className="font-display text-[12px] font-bold text-[#e2e8f0]">{stat.val}</span>
                    </div>
                    <div className="flex gap-1 h-3">
                      {Array.from({ length: stat.bars }).map((_, i) => (
                        <div key={i} className="flex-1 rounded-[1px]" style={{ backgroundColor: i < stat.active ? stat.color : '#1e2532' }} />
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          </TacticalCard>
        </div>
      </div>

      {/* ── BOTTOM TABLE: INCIDENT LOG ── */}
      <TacticalCard title="Incident Event Log" icon={AlertTriangle} delay={0.8} className="p-0">
        <div className="overflow-x-auto p-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1e2532] border-b border-[#2d3440]">
                {['Event ID', 'Timestamp', 'Origin Sector', 'Classification', 'Threat Level', 'Action'].map((h) => (
                  <th key={h} className="px-5 py-3 font-display uppercase tracking-widest text-[10px] font-bold text-[#8c9baf] border-r border-[#2d3440] last:border-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[12px] font-medium">
              <AnimatePresence>
                {filteredAlerts.slice(0, 6).map((al, idx) => (
                  <motion.tr 
                    key={al.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + (idx * 0.05) }}
                    onMouseEnter={() => setHoveredAlert(al.id)}
                    onMouseLeave={() => setHoveredAlert(null)}
                    className="border-b border-[#2d3440]/50 hover:bg-[#1e2532]/60 transition-colors group cursor-crosshair"
                  >
                    <td className="px-5 border-r border-[#2d3440]/50 py-3.5 font-display text-[#8c9baf]">#{al.id.split('-')[1] || al.id}</td>
                    <td className="px-5 border-r border-[#2d3440]/50 py-3.5 text-[#e2e8f0]">{al.timestamp}</td>
                    <td className="px-5 border-r border-[#2d3440]/50 py-3.5 text-[#8c9baf] uppercase tracking-wider">{al.storeId}</td>
                    <td className="px-5 border-r border-[#2d3440]/50 py-3.5 text-[#e2e8f0] uppercase tracking-wider">{al.module}</td>
                    <td className="px-5 border-r border-[#2d3440]/50 py-3.5">
                      <span className="flex items-center gap-2 font-display uppercase tracking-widest text-[10px] font-bold">
                        {al.severity === 'critical' ? (
                          <><div className="w-2 h-2 bg-[#ef4444]" /><span className="text-[#ef4444]">CRITICAL</span></>
                        ) : al.severity === 'high' ? (
                          <><div className="w-2 h-2 bg-[#f97316]" /><span className="text-[#f97316]">HIGH</span></>
                        ) : (
                          <><div className="w-2 h-2 bg-[#10b981]" /><span className="text-[#10b981]">SECURE</span></>
                        )}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        className={`font-display text-[10px] tracking-widest font-bold px-3 py-1.5 border ${
                          hoveredAlert === al.id 
                            ? 'bg-[#3b82f6] text-[#fff] border-[#3b82f6]' 
                            : 'bg-transparent text-[#8c9baf] border-[#4b5563]'
                        } transition-colors uppercase`}
                      >
                        {al.status === 'active' ? 'Investigate' : 'Archive'}
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </TacticalCard>
      
    </div>
  );
}
