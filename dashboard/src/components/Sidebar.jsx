import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Bell,
  Settings,
  Recycle,
  LogIn,
  Boxes,
  Activity,
  SlidersHorizontal,
  ShieldCheck,
  ListChecks,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  UserCircle
} from 'lucide-react';

const mainItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Boxes, label: 'Containers', path: '/containers' },
  { icon: ListChecks, label: 'Events', path: '/events' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Bell, label: 'Alerts', path: '/alerts' },
  { icon: Activity, label: 'Device Health', path: '/device-health' },
  { icon: SlidersHorizontal, label: 'Calibration', path: '/calibration' },
  { icon: ShieldCheck, label: 'Admin', path: '/admin' },
  { icon: Settings, label: 'Settings', path: '/settings' }
];

const bottomItems = [
  { icon: LogIn, label: 'Login', path: '/login' }
];

function SidebarLink({ item, collapsed, onNavigate }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      title={collapsed ? item.label : undefined}
      onClick={onNavigate}
      className={({ isActive }) => isActive ? 'navItem active' : 'navItem'}
    >
      <Icon size={19} />
      {!collapsed && <span>{item.label}</span>}
    </NavLink>
  );
}

export default function Sidebar({ collapsed, mobileOpen, onToggle, onClose }) {
  const sidebarClassName = [
    'sidebar',
    collapsed ? 'collapsed' : '',
    mobileOpen ? 'mobileOpen' : ''
  ].filter(Boolean).join(' ');

  return (
    <aside className={sidebarClassName}>
      <div className="sidebarTop">
        <div className="brand">
          <div className="brandIcon">
            <Recycle size={24} />
          </div>

          {!collapsed && (
            <div className="brandText">
              <h2>WasteSort</h2>
              <p>Edge IoT Platform</p>
            </div>
          )}
        </div>

        <button className="sidebarToggle desktopOnly" onClick={onToggle} title="Toggle sidebar">
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>

        <button className="sidebarClose mobileOnly" onClick={onClose} title="Close sidebar">
          <X size={20} />
        </button>
      </div>

      <div className="sidebarBody">
        <nav className="nav">
          {mainItems.map((item) => (
            <SidebarLink
              key={item.label}
              item={item}
              collapsed={collapsed}
              onNavigate={onClose}
            />
          ))}
        </nav>

        <div className="sidebarBottom">
          {!collapsed && (
            <div className="userMiniCard">
              <UserCircle size={28} />
              <div>
                <strong>Operator</strong>
                <span>Smart Waste Lab</span>
              </div>
            </div>
          )}

          <nav className="nav bottomNav">
            {bottomItems.map((item) => (
              <SidebarLink
                key={item.label}
                item={item}
                collapsed={collapsed}
                onNavigate={onClose}
              />
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
