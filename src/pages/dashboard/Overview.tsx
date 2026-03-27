import { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Calendar, Filter, Send, Mic, Activity, Clock, FileText, ChevronDown } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboardStore';
import { alerts, footfallData, cameras } from '@/data/mockData';

// Count-up hook
function useCountUp(target: number, duration = 1600, start = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>();
  useEffect(() => {
    if (!start) return;
    let startTime: number | undefined;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, start]);
  return count;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: i * 0.08 },
  }),
};

export default function Overview() {
  const { selectedStore } = useDashboardStore();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 150);
    return () => clearTimeout(t);
  }, []);

  const filteredAlerts = alerts.filter(a => selectedStore === 'all' || a.storeId === selectedStore);
  const filteredCameras = cameras.filter(c => selectedStore === 'all' || c.storeId === selectedStore);
  
  const footfallCount = useCountUp(3847, 1600, started);
  const alertCount = useCountUp(filteredAlerts.length, 1200, started);
  const onlineCount = useCountUp(filteredCameras.filter(c => c.status === 'online').length, 1000, started);

  const topOpportunities = filteredAlerts.slice(0, 5).map(a => ({
    id: a.id,
    name: a.type,
    region: a.storeId.toUpperCase(),
    score: Math.floor(Math.random() * 20) + 80,
    risk: a.severity === 'critical' ? 5 : a.severity === 'high' ? 4 : 3,
    increase: '+' + (Math.floor(Math.random() * 50) + 10),
    value: a.timestamp
  }));

  const pieData = [
    { name: 'Customers', value: 344, color: '#6366F1' },
    { name: 'Staff', value: 256, color: '#EAB308' },
    { name: 'Unauthorized', value: 128, color: '#00FF88' },
  ];

  const barData = [
    { name: 'Mon', active: 60, resolved: 40 },
    { name: 'Tue', active: 75, resolved: 25 },
    { name: 'Wed', active: 40, resolved: 60 },
    { name: 'Thu', active: 90, resolved: 10 },
    { name: 'Fri', active: 55, resolved: 45 },
  ];

  return (
    <div className="space-y-5 pb-10">
      {/* ── Page Header ── */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-2">
        <h1 className="text-[32px] font-semibold text-white tracking-tight">Your Analytical Board</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium transition-all hover:bg-white/10" style={{ background: '#111', color: '#FFF', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Calendar size={14} /> Select Date
          </button>
          <button className="flex items-center justify-center w-[38px] h-[38px] rounded-xl transition-all hover:bg-white/10" style={{ background: '#111', color: '#FFF', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Filter size={16} />
          </button>
        </div>
      </motion.div>

      {/* ── Top Row: Smart distribution + AI ── */}
      <div className="flex gap-5">
        
        {/* Left: Smart Surveillance Distribution */}
        <motion.div
          custom={0} variants={cardVariants} initial="hidden" animate="visible"
          className="flex-[1.4] rounded-[24px] p-7 flex flex-col justify-between relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #111111 0%, #0A140F 100%)',
            border: '1px solid rgba(0,255,136,0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          {/* Intense bottom green glow matching reference */}
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'radial-gradient(ellipse at bottom, rgba(0,255,136,0.25) 0%, transparent 70%)' }} />
          
          <div className="relative z-10 mb-8">
            <h2 className="text-[20px] font-semibold text-white mb-1.5">Smart Surveillance Distribution</h2>
            <p className="text-[13px]" style={{ color: '#888' }}>AI-enhanced security metrics showing growth in detection, compliance, and overall performance.</p>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4">
            {[
              { label: 'Total Footfall', val: footfallCount.toLocaleString(), icon: <Activity size={12} /> },
              { label: 'Active Alerts', val: '+' + alertCount.toString() + '%', icon: <Clock size={12} /> },
              { label: 'Cameras Online', val: onlineCount.toLocaleString(), icon: <Activity size={12} /> },
            ].map((stat, i) => (
              <div
                key={i}
                className="rounded-[16px] p-5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-5 h-5 rounded-md" style={{ background: 'rgba(255,255,255,0.1)', color: '#CCC' }}>
                    {stat.icon}
                  </div>
                  <span className="text-[12px] font-medium text-white">{stat.label}</span>
                </div>
                <p className="text-[28px] font-semibold text-white tracking-tight">{stat.val}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: VisionIQ AI */}
        <motion.div
          custom={1} variants={cardVariants} initial="hidden" animate="visible"
          className="flex-1 rounded-[24px] p-6 flex flex-col relative overflow-hidden"
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
        >
          {/* Orb container */}
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[220px]">
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-2">
              <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>-</button>
              <span className="text-[15px] font-medium text-white">VisionIQ AI</span>
              <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>+</button>
            </div>
            
            {/* The beautiful glowing orb */}
            <div className="relative mt-8 mb-6">
              <div
                className="w-36 h-36 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #D4FF59 0%, #00FF88 40%, #008A5E 100%)',
                  boxShadow: 'inset -8px -8px 24px rgba(0,0,0,0.4), 0 0 40px rgba(0,255,136,0.3)',
                  animation: 'orb-float 4s ease-in-out infinite'
                }}
              />
              {/* Star sparkles around orb */}
              <div className="absolute top-0 left-[-20px] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />
              <div className="absolute bottom-10 right-[-10px] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
            </div>
            
            <p className="text-[13px] text-[#AAA] font-medium">How can I assist you today?</p>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mb-3 mt-4">
            <button className="flex flex-col items-center justify-center rounded-[14px] py-4 transition-colors hover:bg-white/10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <PieChart size={18} className="mb-2 text-[#D4FF59]" />
              <span className="text-[12px] font-medium text-[#CCC]">Pro Analysis</span>
            </button>
            <button className="flex flex-col items-center justify-center rounded-[14px] py-4 transition-colors hover:bg-white/10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <FileText size={18} className="mb-2 text-[#D4FF59]" />
              <span className="text-[12px] font-medium text-[#CCC]">Report</span>
            </button>
          </div>

          {/* Chat input */}
          <div className="relative flex items-center bg-[#1A1A1A] rounded-[16px] px-4 py-3" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            <input type="text" placeholder="Ask anything..." className="bg-transparent border-none outline-none text-[13px] text-white flex-1" />
            <div className="flex items-center gap-3">
              <button><Send size={14} className="text-[#D4FF59]" /></button>
              <button><Mic size={14} className="text-[#666]" /></button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Middle Row: Two Analytical Cards ── */}
      <div className="flex gap-5">
        
        {/* Footfall Analysis (White card in ref, let's keep it very light/white for contrast!) */}
        <motion.div
          custom={2} variants={cardVariants} initial="hidden" animate="visible"
          className="flex-[1] rounded-[24px] p-6 relative overflow-hidden flex flex-col"
          style={{ background: '#FFFFFF', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-black text-white p-1 rounded-md"><Activity size={12} /></div>
              <h3 className="text-[15px] font-bold text-black">Footfall Analysis</h3>
            </div>
            <button className="flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full border border-gray-200 text-black">
              01-07 Jan <ChevronDown size={12} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} startAngle={180} endAngle={0} paddingAngle={2} dataKey="value" stroke="none">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute flex flex-col items-center" style={{ top: '60%', transform: 'translateY(-50%)' }}>
              <span className="text-[20px] font-bold text-black">3,847</span>
              <span className="text-[11px] text-gray-500 font-medium">Total Footfall</span>
            </div>
            {/* Floating legend points based on reference */}
            <div className="absolute right-4 top-10 space-y-3">
              {pieData.map(d => (
                <div key={d.name} className="flex flex-col items-start text-[11px] font-bold text-black">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color}}/> {d.value} <span className="text-gray-400 font-medium">{d.name}</span></span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1"><span className="w-3 h-3 border border-gray-300 rounded-full flex items-center justify-center text-[7px]">i</span> Calculated from aggregated activity for the selected period</p>
        </motion.div>

        {/* Incident Analysis (Bright Neon Green card in ref) */}
        <motion.div
          custom={3} variants={cardVariants} initial="hidden" animate="visible"
          className="flex-[1.4] rounded-[24px] p-6 relative flex flex-col overflow-hidden"
          style={{ background: '#D4FF59', boxShadow: '0 10px 30px rgba(212,255,89,0.1)' }}
        >
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <div className="bg-black text-white p-1 rounded-md"><Activity size={12} /></div>
              <h3 className="text-[15px] font-bold text-black">Incident Analysis</h3>
            </div>
            <button className="flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full border border-black/10 text-black bg-white/40">
              01-07 Jan <ChevronDown size={12} />
            </button>
          </div>

          <div className="flex-1 relative mt-4">
            {/* Custom chart matching the reference visual style */}
            <div className="absolute inset-0 flex items-end justify-around pb-4">
              
              {/* Bar 1 (Striped) */}
              <div className="relative w-1/3 h-full flex items-end justify-center">
                <div className="absolute -top-10 bg-white shadow-sm px-3 py-1.5 rounded-lg text-[11px] font-bold text-black">
                  Active Alerts 6K <div className="absolute bottom-[-4px] left-4 w-2 h-2 bg-white transform rotate-45" />
                </div>
                {/* Striped pattern background for the bar */}
                <div className="w-[85%] h-[90%] rounded-xl" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 10px)', border: '2px solid rgba(0,0,0,0.05)' }} />
              </div>
              
              {/* Bar 2 (Black solid) */}
              <div className="relative w-1/3 flex items-end justify-center h-full">
                <div className="absolute top-10 bg-white shadow-sm px-3 py-1.5 rounded-lg text-[11px] font-bold text-black z-10 w-max">
                  Resolved Alerts 2K <div className="absolute bottom-[-4px] left-4 w-2 h-2 bg-white transform rotate-45" />
                </div>
                <div className="w-[85%] h-[40%] bg-black rounded-xl shadow-xl border border-white/10" style={{ backgroundImage: 'linear-gradient(180deg, #333 0%, #000 100%)' }} />
              </div>

              {/* Bar 3 (White solid) */}
              <div className="relative w-1/3 flex items-end justify-center h-full">
                <div className="absolute top-0 right-0 bg-white shadow-sm px-3 py-1.5 rounded-lg text-[11px] font-bold text-black z-10 w-max translate-x-4">
                  AI Prevented 4K <div className="absolute bottom-[-4px] right-6 w-2 h-2 bg-white transform rotate-45" />
                </div>
                <div className="w-[85%] h-[60%] bg-white rounded-xl shadow-lg border border-white/50" />
              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Table: Top Opportunities ── */}
      <motion.div
        custom={4} variants={cardVariants} initial="hidden" animate="visible"
        className="rounded-[24px] bg-white p-6 pb-2"
        style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-[#D4FF59] text-black p-1.5 rounded-md"><Activity size={14} /></div>
            <h3 className="text-[17px] font-bold text-black">Top Security Alerts</h3>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 text-[12px] font-medium px-4 py-1.5 rounded-full border border-gray-200 text-black">
              Month <ChevronDown size={14} />
            </button>
            <button className="flex items-center justify-center px-3 rounded-full border border-gray-200 text-black">
              <Filter size={14} />
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
              {['Name', 'Region', 'AI Confidence Score', 'Risk Level', 'Detection Time', 'Action'].map(h => (
                <th key={h} className="pb-4 text-left text-[11px] font-bold text-gray-400 capitalize px-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topOpportunities.map((op, i) => (
              <tr key={i} className="group" style={{ borderBottom: i !== topOpportunities.length -1 ? '1px solid #F8F8F8' : 'none' }}>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    {/* Small preview orb */}
                    <div className="w-8 h-8 rounded-full shadow-sm" style={{ background: 'radial-gradient(circle at 30% 30%, #444 0%, #000 100%)', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }} />
                    <span className="text-[13px] font-bold text-black">{op.name}</span>
                  </div>
                </td>
                <td className="py-4 px-2 text-[13px] font-bold text-black">{op.region}</td>
                <td className="py-4 px-2 text-[13px] font-bold text-black">{op.score}%</td>
                <td className="py-4 px-2">
                  <div className="flex gap-[2px]">
                    {Array.from({ length: 10 }).map((_, idx) => (
                      <div key={idx} className="w-[5px] h-3 rounded-[1px]" style={{ background: idx < op.risk ? '#D4FF59' : '#EEE' }} />
                    ))}
                  </div>
                </td>
                <td className="py-4 px-2 text-[13px] font-bold text-black">{op.value}</td>
                <td className="py-4 px-2 text-[13px] font-bold text-black">
                    <button className="text-[#000] border border-gray-200 px-3 py-1 rounded-full text-[11px] font-bold hover:bg-gray-50 transition-colors">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
