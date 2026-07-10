import { Cpu, Wifi, Clock3, RadioTower, GitBranch } from 'lucide-react';

export default function StatusStrip({ state }) {
  const items = [
    { icon: Cpu, label: 'ESP32', value: state.status === 'online' ? 'Online' : 'Offline' },
    { icon: Wifi, label: 'WiFi', value: `${state.wifiSignal} dBm` },
    { icon: RadioTower, label: 'Sync', value: state.mqttStatus },
    { icon: Clock3, label: 'Uptime', value: state.uptime },
    { icon: GitBranch, label: 'Firmware', value: state.firmwareVersion }
  ];

  return (
    <div className="statusStrip">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div className="statusItem" key={item.label}>
            <Icon size={15} />
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        );
      })}
    </div>
  );
}
