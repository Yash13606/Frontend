import { useState } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { cameras, stores, staff } from '@/data/mockData';

const tabs = ['Organization', 'Stores', 'Cameras', 'Users', 'Notifications'];

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

const notifications = [
  { label: 'Critical Theft Alerts', desc: 'Receive instant alerts for critical severity theft events', enabled: true },
  { label: 'Fire & Thermal Alerts', desc: 'Alerts for fire detection and thermal anomalies', enabled: true },
  { label: 'Staff Idle Notifications', desc: 'Notify when staff are idle for more than 15 minutes', enabled: false },
  { label: 'Camera Offline Alerts', desc: 'Get notified when any camera goes offline', enabled: true },
  { label: 'Blacklist Re-ID Hits', desc: 'Alert when a blacklisted person is identified', enabled: true },
  { label: 'Daily Summary Report', desc: 'Automated daily digest at 9:00 PM IST', enabled: false },
];

const userRoles: Record<string, { color: string; bg: string }> = {
  'Super Admin':    { color: '#00FF88', bg: 'rgba(0,255,136,0.10)' },
  'Store Manager':  { color: '#6366F1', bg: 'rgba(99,102,241,0.10)' },
  'Security':       { color: '#F97316', bg: 'rgba(249,115,22,0.10)' },
  'Analyst':        { color: '#EAB308', bg: 'rgba(234,179,8,0.10)' },
};

const users = [
  { name: 'Yash Mehta', email: 'yash@visioniq.in', role: 'Super Admin', lastActive: '2 min ago' },
  { name: 'Rahul Sharma', email: 'rahul@visioniq.in', role: 'Store Manager', lastActive: '15 min ago' },
  { name: 'Priya Kapoor', email: 'priya@visioniq.in', role: 'Security', lastActive: '1 hr ago' },
  { name: 'Ananya Reddy', email: 'ananya@visioniq.in', role: 'Analyst', lastActive: '3 hr ago' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Organization');
  const [notifState, setNotifState] = useState(notifications.map(n => n.enabled));
  const [storeStatus, setStoreStatus] = useState(stores.map(() => true));
  const [camStatus, setCamStatus] = useState(cameras.map(c => c.status === 'online'));

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6">
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase mb-1" style={{ color: '#00FF88' }}>● SETTINGS</p>
        <h1 className="text-[28px] font-bold text-white">Settings</h1>
        <p className="text-[14px] mt-1" style={{ color: '#888' }}>Manage your organization, stores, cameras, and preferences</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-lg text-[13px] font-medium transition-all"
            style={{
              background: activeTab === tab ? 'rgba(0,255,136,0.15)' : '#111',
              color: activeTab === tab ? '#00FF88' : '#888',
              border: `1px solid ${activeTab === tab ? 'rgba(0,255,136,0.40)' : 'rgba(255,255,255,0.07)'}`,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Organization Tab */}
        {activeTab === 'Organization' && (
          <div className="rounded-xl p-6" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-start justify-between mb-6">
              <p className="text-[11px] font-medium tracking-[0.12em] uppercase" style={{ color: '#00FF88' }}>ORGANIZATION DETAILS</p>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold" style={{ color: '#00FF88', background: 'rgba(0,255,136,0.10)', border: '1px solid rgba(0,255,136,0.25)' }}>
                ENTERPRISE PLAN
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Company Name', val: 'VisionIQ India Pvt. Ltd.' },
                { label: 'Contact Email', val: 'admin@visioniq.in' },
                { label: 'Address', val: 'Andheri East, Mumbai, MH 400069' },
                { label: 'GSTIN', val: '27AAACV1234F1ZQ' },
              ].map(field => (
                <div key={field.label}>
                  <label className="block text-[11px] font-medium mb-2" style={{ color: '#555' }}>{field.label}</label>
                  <input type="text" defaultValue={field.val} style={inputStyle} />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button
                className="px-5 py-2 rounded-lg text-[13px] font-semibold transition-all hover:opacity-90"
                style={{ background: 'rgba(0,255,136,0.15)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.40)' }}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Stores Tab */}
        {activeTab === 'Stores' && (
          <div className="rounded-xl overflow-hidden" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-[11px] font-medium tracking-[0.12em] uppercase" style={{ color: '#00FF88' }}>STORE MANAGEMENT</p>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['Store Name', 'Location', 'Cameras', 'Status', 'Active'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-medium tracking-widest uppercase" style={{ color: '#444' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stores.map((s, i) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? '#111' : '#0D0D0D' }}>
                    <td className="px-4 py-3 text-[13px] font-medium" style={{ color: '#CCC' }}>{s.name}</td>
                    <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{s.location}</td>
                    <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{s.cameras}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full"
                        style={{ color: storeStatus[i] ? '#00FF88' : '#555', background: storeStatus[i] ? 'rgba(0,255,136,0.10)' : 'rgba(255,255,255,0.05)' }}>
                        {storeStatus[i] ? 'ONLINE' : 'PAUSED'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Switch checked={storeStatus[i]} onCheckedChange={v => setStoreStatus(prev => prev.map((s, idx) => idx === i ? v : s))} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Cameras Tab */}
        {activeTab === 'Cameras' && (
          <div className="rounded-xl overflow-hidden" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-[11px] font-medium tracking-[0.12em] uppercase" style={{ color: '#00FF88' }}>CAMERA MANAGEMENT</p>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['Camera', 'Store', 'Zone', 'Status', 'Active'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-medium tracking-widest uppercase" style={{ color: '#444' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cameras.map((c, i) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? '#111' : '#0D0D0D' }}>
                    <td className="px-4 py-3 text-[13px] font-medium" style={{ color: '#CCC' }}>{c.name}</td>
                    <td className="px-4 py-3 text-[13px] capitalize" style={{ color: '#888' }}>{c.storeId}</td>
                    <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{c.zone}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full"
                        style={{ color: camStatus[i] ? '#00FF88' : '#555', background: camStatus[i] ? 'rgba(0,255,136,0.10)' : 'rgba(255,255,255,0.05)' }}>
                        {camStatus[i] ? 'ONLINE' : 'OFFLINE'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Switch checked={camStatus[i]} onCheckedChange={v => setCamStatus(prev => prev.map((s, idx) => idx === i ? v : s))} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'Users' && (
          <div className="rounded-xl overflow-hidden" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-[11px] font-medium tracking-[0.12em] uppercase" style={{ color: '#00FF88' }}>USER MANAGEMENT</p>
            </div>
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['Name', 'Email', 'Role', 'Last Active'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-medium tracking-widest uppercase" style={{ color: '#444' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => {
                  const rc = userRoles[u.role] ?? userRoles['Analyst'];
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? '#111' : '#0D0D0D' }}>
                      <td className="px-4 py-3 text-[13px] font-medium" style={{ color: '#CCC' }}>{u.name}</td>
                      <td className="px-4 py-3 text-[13px]" style={{ color: '#888' }}>{u.email}</td>
                      <td className="px-4 py-3">
                        <span className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-full"
                          style={{ color: rc.color, background: rc.bg }}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[13px]" style={{ color: '#555' }}>{u.lastActive}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'Notifications' && (
          <div className="rounded-xl p-6" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-[11px] font-medium tracking-[0.12em] uppercase mb-5" style={{ color: '#00FF88' }}>NOTIFICATION PREFERENCES</p>
            <div className="space-y-0">
              {notifications.map((n, i) => (
                <div
                  key={n.label}
                  className="flex items-center justify-between py-4"
                  style={{ borderBottom: i < notifications.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                >
                  <div>
                    <p className="text-[14px] font-medium text-white">{n.label}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: '#555' }}>{n.desc}</p>
                  </div>
                  <Switch
                    checked={notifState[i]}
                    onCheckedChange={v => setNotifState(prev => prev.map((s, idx) => idx === i ? v : s))}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
