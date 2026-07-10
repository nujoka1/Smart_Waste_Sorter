import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

import Sidebar from './components/Sidebar.jsx';
import StatusStrip from './components/StatusStrip.jsx';

import Dashboard from './pages/Dashboard.jsx';
import Containers from './pages/Containers.jsx';
import Events from './pages/Events.jsx';
import Analytics from './pages/Analytics.jsx';
import Alerts from './pages/Alerts.jsx';
import DeviceHealth from './pages/DeviceHealth.jsx';
import Calibration from './pages/Calibration.jsx';
import Admin from './pages/Admin.jsx';
import Settings from './pages/Settings.jsx';
import Login from './pages/Login.jsx';

import { useSystemState } from './hooks/useSystemState.js';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { state } = useSystemState();

  function closeMobileSidebar() {
    setMobileSidebarOpen(false);
  }

  return (
    <BrowserRouter>
      <div className="appShell">
        <Sidebar
          collapsed={collapsed}
          mobileOpen={mobileSidebarOpen}
          onToggle={() => setCollapsed((value) => !value)}
          onClose={closeMobileSidebar}
        />

        {mobileSidebarOpen && (
          <button
            className="mobileSidebarOverlay"
            onClick={closeMobileSidebar}
            aria-label="Close navigation menu"
          />
        )}

        <main className={collapsed ? 'mainPanel expanded' : 'mainPanel'}>
          <div className="mobileAppBar">
            <button
              className="mobileMenuButton"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>

            <div>
              <h1>WasteSort</h1>
              <p>{state.status} · {state.wifiSignal} dBm</p>
            </div>
          </div>

          <StatusStrip state={state} />

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/containers" element={<Containers />} />
            <Route path="/events" element={<Events />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/device-health" element={<DeviceHealth />} />
            <Route path="/calibration" element={<Calibration />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
