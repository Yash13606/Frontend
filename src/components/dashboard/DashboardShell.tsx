import { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, ShieldAlert, UserCheck, Flame,
  ScanFace, Bell, FileText, Settings,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { StoreSelector } from './StoreSelector';
import { StatusDot } from './StatusDot';
import { useDashboardStore } from '@/store/dashboardStore';
import { alerts, cameras } from '@/data/mockData';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { to: '/dashboard/customer-analytics', label: 'Customer Analytics', icon: Users },
  { to: '/dashboard/loss-prevention', label: 'Loss Prevention', icon: ShieldAlert },
  { to: '/dashboard/staff-monitor', label: 'Staff Monitor', icon: UserCheck },
  { to: '/dashboard/fire-safety', label: 'Fire & Safety', icon: Flame },
  { to: '/dashboard/people-reid', label: 'People Re-ID', icon: ScanFace },
  { to: '/dashboard/alerts', label: 'Alerts Center', icon: Bell },
  { to: '/dashboard/reports', label: 'Reports', icon: FileText },
];

const PAGE_NAMES: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/customer-analytics': 'Customer Analytics',
  '/dashboard/loss-prevention': 'Loss Prevention',
  '/dashboard/staff-monitor': 'Staff Monitor',
  '/dashboard/fire-safety': 'Fire & Safety',
  '/dashboard/people-reid': 'People Re-ID',
  '/dashboard/alerts': 'Alerts Center',
  '/dashboard/reports': 'Reports',
  '/dashboard/settings': 'Settings',
};

function SidebarIcon({ item, criticalCount }: { item: typeof navItems[0]; criticalCount?: number }) {
  const isExact = item.exact;
  const location = useLocation();
  const isActive = isExact
    ? location.pathname === item.to
    : location.pathname.startsWith(item.to);
  const Icon = item.icon;

  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <NavLink
          to={item.to}
          end={isExact}
          className="relative flex items-center justify-center transition-colors hover:bg-white/5"
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
          }}
        >
          <Icon
            size={16}
            style={{ color: isActive ? '#FFFFFF' : '#888888', transition: 'color 120ms ease' }}
          />
          {item.label === 'Alerts Center' && criticalCount !== undefined && criticalCount > 0 && (
            <span
              className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
              style={{ background: '#EF4444', color: '#fff' }}
            >
              {criticalCount}
            </span>
          )}
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right" className="text-xs">
        {item.label}
      </TooltipContent>
    </Tooltip>
  );
}

interface DashboardShellProps {
  children: ReactNode;
}

export const DashboardShell = ({ children }: DashboardShellProps) => {
  const location = useLocation();
  const pageName = PAGE_NAMES[location.pathname] ?? 'Dashboard';
  const { selectedStore } = useDashboardStore();

  const filteredAlerts = alerts.filter(a =>
    selectedStore === 'all' || a.storeId === selectedStore
  );
  const criticalCount = filteredAlerts.filter(a => a.severity === 'critical' && a.status === 'active').length;

  const filteredCameras = cameras.filter(c =>
    selectedStore === 'all' || c.storeId === selectedStore
  );
  const onlineCameras = filteredCameras.filter(c => c.status === 'online').length;

  return (
    <div className="flex min-h-screen" style={{ background: '#000000', fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside
        className="fixed left-0 top-0 bottom-0 z-50 flex flex-col items-center py-3 gap-1"
        style={{
          width: 52,
          background: '#000000',
          borderRight: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-center font-bold text-sm mb-4"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: '#FFFFFF',
            color: '#000000',
            fontSize: 15,
            userSelect: 'none',
          }}
        >
          V
        </div>

        {/* Nav icons */}
        <div className="flex flex-col items-center gap-1 flex-1">
          {navItems.map(item => (
            <SidebarIcon key={item.to} item={item} criticalCount={criticalCount} />
          ))}
        </div>

        {/* Settings — pinned to bottom */}
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <NavLink
              to="/dashboard/settings"
              className="flex items-center justify-center transition-all duration-120"
              style={{ width: 34, height: 34, borderRadius: 8 }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.10)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
            >
              <Settings size={16} style={{ color: '#444' }} />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">Settings</TooltipContent>
        </Tooltip>
      </aside>

      {/* Main area (offset for sidebar) */}
      <div className="flex flex-col flex-1" style={{ marginLeft: 52 }}>
        {/* Top bar */}
        <header
          className="sticky top-0 z-40 flex items-center justify-between px-5"
          style={{
            height: 52,
            background: '#000000',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[12px]">
            <span style={{ color: '#444' }}>Dashboards</span>
            <span style={{ color: '#333' }}>/</span>
            <span style={{ color: '#888' }}>{pageName}</span>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <StoreSelector />

            {/* Camera count */}
            <div className="flex items-center gap-1.5 text-[12px]" style={{ color: '#555' }}>
              <StatusDot status="online" size={7} />
              <span>{filteredCameras.length} cams</span>
              {filteredCameras.length > onlineCameras && (
                <span style={{ color: '#EF4444' }}>({filteredCameras.length - onlineCameras} offline)</span>
              )}
            </div>

            {/* Bell */}
            <div className="relative cursor-pointer">
              <Bell size={16} style={{ color: '#444' }} />
              {criticalCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold"
                  style={{ background: '#EF4444', color: '#fff' }}
                >
                  {criticalCount}
                </span>
              )}
            </div>

            {/* Avatar */}
            <div
              className="flex items-center justify-center rounded-full text-[11px] font-medium cursor-pointer transition-colors"
              style={{
                width: 28,
                height: 28,
                background: 'rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              YM
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          className="flex-1 overflow-y-auto p-6"
          style={{ background: '#0A0A0A' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;
