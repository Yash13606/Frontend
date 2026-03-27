import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KPICard } from '@/components/dashboard/KPICard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { SeverityPill } from '@/components/dashboard/SeverityPill';
import { LiveBadge } from '@/components/dashboard/LiveBadge';
import { useDashboardStore } from '@/store/dashboardStore';
import { reidEvents, blacklistEntries } from '@/data/mockData';

const zoneMap = [
  { zone: 'Entry', activity: 'high', alertCount: 2 },
  { zone: 'Aisle 1', activity: 'normal', alertCount: 0 },
  { zone: 'Aisle 2', activity: 'normal', alertCount: 0 },
  { zone: 'Aisle 3', activity: 'elevated', alertCount: 1 },
  { zone: 'Aisle 4', activity: 'normal', alertCount: 0 },
  { zone: 'Aisle 5', activity: 'normal', alertCount: 0 },
  { zone: 'Electronics', activity: 'elevated', alertCount: 1 },
  { zone: 'Trial Rooms', activity: 'high', alertCount: 3 },
  { zone: 'POS Area', activity: 'normal', alertCount: 0 },
  { zone: 'Stockroom', activity: 'normal', alertCount: 0 },
  { zone: 'Cafe', activity: 'normal', alertCount: 0 },
  { zone: 'Exit', activity: 'elevated', alertCount: 1 },
];

const activityColor: Record<string, string> = {
  normal:   'rgba(0,255,136,0.06)',
  elevated: 'rgba(234,179,8,0.12)',
  high:     'rgba(239,68,68,0.15)',
};
const activityBorder: Record<string, string> = {
  normal:   'rgba(0,255,136,0.08)',
  elevated: 'rgba(234,179,8,0.30)',
  high:     'rgba(239,68,68,0.35)',
};
const activityText: Record<string, string> = {
  normal:   '#555',
  elevated: '#EAB308',
  high:     '#EF4444',
};

export default function PeopleReID() {
  const { selectedStore } = useDashboardStore();
  const [events] = useState(reidEvents);

  const filteredEvents = events.filter(e =>
    selectedStore === 'all' || e.storeId === selectedStore
  );

  const blacklistHits = filteredEvents.filter(e => e.type === 'Blacklist Match').length;
  const crossZone = filteredEvents.filter(e => e.type === 'Cross-Zone Track').length;
  const crowdAlerts = filteredEvents.filter(e => e.type === 'Crowd Density').length;

  const filteredBlacklist = blacklistEntries.filter(b =>
    selectedStore === 'all' || b.storeId === selectedStore
  );

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase mb-1" style={{ color: '#00FF88' }}>● PEOPLE RE-ID</p>
        <h1 className="text-[28px] font-bold text-white">People Re-Identification</h1>
        <p className="text-[14px] mt-1" style={{ color: '#888' }}>Cross-camera tracking, blacklist matching, and crowd monitoring</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <KPICard label="Blacklist Hits Today" value={Math.max(blacklistHits, 3)} valueColor="#EF4444" index={0} />
        <KPICard label="Cross-Zone Events" value={Math.max(crossZone, 8)} index={1} />
        <KPICard label="Crowd Density Alerts" value={Math.max(crowdAlerts, 2)} valueColor="#F97316" index={2} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        {/* Re-ID Event Feed */}
        <ChartCard
          title="Re-ID Event Feed"
          index={3}
          rightLabel={<LiveBadge />}
        >
          <div className="space-y-2 overflow-y-auto max-h-[300px]">
            <AnimatePresence initial={false}>
              {filteredEvents.map(event => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-full shrink-0 text-[10px] font-bold"
                    style={{
                      width: 32, height: 32,
                      background: 'rgba(0,255,136,0.10)',
                      color: '#00FF88',
                    }}
                  >
                    AI
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[12px] font-semibold" style={{ color: '#00FF88' }}>{event.id}</span>
                      <SeverityPill severity={event.severity as 'critical'|'high'|'medium'|'low'} />
                    </div>
                    <p className="text-[12px]" style={{ color: '#888' }}>{event.type} · <span style={{ color: '#555' }}>{event.zone}</span></p>
                  </div>
                  <span className="text-[11px] shrink-0" style={{ color: '#444' }}>{event.time}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ChartCard>

        {/* SVG Zone Map */}
        <ChartCard title="Zone Activity Map" index={4}>
          <div className="grid grid-cols-4 gap-2">
            {zoneMap.map((zone, i) => (
              <motion.div
                key={zone.zone}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="relative rounded-lg p-2 flex flex-col items-center justify-center text-center"
                style={{
                  minHeight: 60,
                  background: activityColor[zone.activity],
                  border: `1px solid ${activityBorder[zone.activity]}`,
                }}
              >
                {zone.alertCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 flex items-center justify-center text-[9px] font-bold rounded-full h-4 w-4"
                    style={{ background: '#EF4444', color: '#fff' }}
                  >
                    {zone.alertCount}
                  </span>
                )}
                <p className="text-[10px] font-medium" style={{ color: activityText[zone.activity] }}>
                  {zone.zone}
                </p>
                <p className="text-[9px] mt-0.5 uppercase font-bold tracking-wider" style={{ color: activityText[zone.activity] }}>
                  {zone.activity}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-[10px]" style={{ color: '#555' }}>
            {[['Normal','#00FF88'], ['Elevated','#EAB308'], ['High Alert','#EF4444']].map(([label, color]) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: color as string }} />
                {label}
              </span>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Blacklist Tracking Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="rounded-xl overflow-hidden"
        style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[11px] font-medium tracking-[0.12em] uppercase" style={{ color: '#00FF88' }}>BLACKLIST TRACKING</p>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {['Person ID', 'Times Seen', 'Last Zone', 'Last Time', 'Camera', 'Action'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-medium tracking-widest uppercase" style={{ color: '#444' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBlacklist.map((b, i) => (
              <tr key={b.personId} style={{ background: i % 2 === 0 ? '#111' : '#0D0D0D', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td className="px-4 py-3 text-[13px] font-semibold" style={{ color: '#EF4444' }}>{b.personId}</td>
                <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{b.timesSeen}</td>
                <td className="px-4 py-3 text-[13px]" style={{ color: '#CCC' }}>{b.lastZone}</td>
                <td className="px-4 py-3 text-[13px]" style={{ color: '#555' }}>{b.lastTime}</td>
                <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{b.cameraId}</td>
                <td className="px-4 py-3">
                  <button
                    className="text-[11px] font-semibold px-3 py-1 rounded-lg transition-opacity hover:opacity-70 opacity-60 cursor-not-allowed"
                    style={{ color: '#00FF88', border: '1px solid rgba(0,255,136,0.25)' }}
                    disabled
                  >
                    View Footage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
