import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Bell,
  Settings,
  LogIn,
  Boxes,
  Activity,
  SlidersHorizontal,
  ShieldCheck,
  ListChecks
} from 'lucide-react';

const tabs = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Boxes, label: 'Containers', path: '/containers' },
  { icon: ListChecks, label: 'Events', path: '/events' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Bell, label: 'Alerts', path: '/alerts' },
  { icon: Activity, label: 'Device Health', path: '/device-health' },
  { icon: SlidersHorizontal, label: 'Calibration', path: '/calibration' },
  { icon: ShieldCheck, label: 'Admin', path: '/admin' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: LogIn, label: 'Login', path: '/login' }
];

export default function TopTabs() {
  return (
    <div className="topTabs">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <NavLink
            key={tab.label}
            to={tab.path}
            className={({ isActive }) => isActive ? 'topTab active' : 'topTab'}
          >
            <Icon size={17} />
            <span>{tab.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
}
