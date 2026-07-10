export const systemState = {
  systemName: 'IoT Smart Waste Sorter',
  deviceId: 'waste_sorter_001',
  status: 'online',
  uptime: '2h 41m',
  wifiSignal: -58,
  mqttStatus: 'connected',
  firmwareVersion: '0.1.0',
  lastSync: '12:04 PM',
  location: 'Engineering Lab'
};

export const bins = [
  {
    type: 'Plastic',
    fill: 62,
    status: 'ok',
    itemsToday: 18,
    lastEmptied: 'Today, 09:30 AM',
    estimatedFullTime: '1–3 days',
    recommendedAction: 'Normal operation'
  },
  {
    type: 'Metal',
    fill: 41,
    status: 'ok',
    itemsToday: 9,
    lastEmptied: 'Today, 09:30 AM',
    estimatedFullTime: '2–4 days',
    recommendedAction: 'Normal operation'
  },
  {
    type: 'Wet / Organic',
    fill: 84,
    status: 'warning',
    itemsToday: 25,
    lastEmptied: 'Today, 09:30 AM',
    estimatedFullTime: 'Less than 8 hours',
    recommendedAction: 'Empty soon'
  },
  {
    type: 'Paper / Glass',
    fill: 55,
    status: 'ok',
    itemsToday: 12,
    lastEmptied: 'Today, 09:30 AM',
    estimatedFullTime: '1–2 days',
    recommendedAction: 'Normal operation'
  },
  {
    type: 'Unknown',
    fill: 17,
    status: 'ok',
    itemsToday: 4,
    lastEmptied: 'Today, 09:30 AM',
    estimatedFullTime: '3–5 days',
    recommendedAction: 'Review unknown items'
  }
];

export const todayStats = {
  totalItems: 68,
  recyclableItems: 39,
  organicItems: 25,
  unknownItems: 4,
  averageConfidence: 87,
  sortingAccuracy: 94,
  categoryBreakdown: [
    { name: 'Plastic', value: 18 },
    { name: 'Metal', value: 9 },
    { name: 'Organic', value: 25 },
    { name: 'Paper/Glass', value: 12 },
    { name: 'Unknown', value: 4 }
  ],
  weeklyTrend: [
    { day: 'Mon', items: 42 },
    { day: 'Tue', items: 55 },
    { day: 'Wed', items: 68 },
    { day: 'Thu', items: 49 },
    { day: 'Fri', items: 73 },
    { day: 'Sat', items: 61 },
    { day: 'Sun', items: 38 }
  ]
};

export const recentEvents = [
  {
    time: '12:04',
    category: 'Plastic',
    confidence: 91,
    bin: 'Plastic Bin',
    status: 'Sorted'
  },
  {
    time: '12:02',
    category: 'Organic',
    confidence: 95,
    bin: 'Wet / Organic Bin',
    status: 'Sorted'
  },
  {
    time: '11:58',
    category: 'Unknown',
    confidence: 0,
    bin: 'Unknown Bin',
    status: 'Review'
  },
  {
    time: '11:55',
    category: 'Metal',
    confidence: 99,
    bin: 'Metal Bin',
    status: 'Sorted'
  },
  {
    time: '11:50',
    category: 'Paper/Glass',
    confidence: 81,
    bin: 'Paper / Glass Bin',
    status: 'Sorted'
  }
];

export const alerts = [
  {
    severity: 'warning',
    title: 'Organic bin approaching full',
    message: 'Wet / Organic bin is at 84% capacity.'
  },
  {
    severity: 'info',
    title: 'Unknown waste detected',
    message: '4 items routed to Unknown bin today.'
  }
];

export const deviceHealth = {
  esp32: 'online',
  wifiSignal: -58,
  firebaseSync: 'connected',
  uptime: '2h 41m',
  firmwareVersion: '0.1.0',
  freeHeap: '186 KB',
  lastHeartbeat: '12:04 PM',
  sensors: [
    { name: 'IR Object Sensor', status: 'ok', detail: 'Trigger stable' },
    { name: 'Inductive Metal Sensor', status: 'ok', detail: 'No fault detected' },
    { name: 'Capacitive Moisture Sensor', status: 'ok', detail: 'ADC active' },
    { name: 'Conductive Wetness Plate', status: 'ok', detail: 'ADC active' },
    { name: 'Color Sensor', status: 'warning', detail: 'Calibration recommended' },
    { name: 'Ultrasonic Fill Sensor', status: 'ok', detail: 'Distance reading active' },
    { name: 'Servo Router', status: 'ok', detail: 'Last movement successful' }
  ]
};

export const calibration = {
  thresholds: [
    {
      key: 'Moisture threshold',
      value: '60%',
      description: 'Wet/organic classification threshold'
    },
    {
      key: 'Conductive plate threshold',
      value: '700 ADC',
      description: 'Wetness confirmation threshold'
    },
    {
      key: 'Color pulse plastic',
      value: '< 12000 µs',
      description: 'Temporary plastic classification threshold'
    },
    {
      key: 'Color pulse paper/glass',
      value: '< 35000 µs',
      description: 'Temporary dry recyclable threshold'
    },
    {
      key: 'Bin empty distance',
      value: '30 cm',
      description: 'Ultrasonic reading when bin is empty'
    },
    {
      key: 'Bin full distance',
      value: '5 cm',
      description: 'Ultrasonic reading when bin is full'
    }
  ],
  servoAngles: [
    { bin: 'Plastic', angle: '20°' },
    { bin: 'Metal', angle: '55°' },
    { bin: 'Wet / Organic', angle: '90°' },
    { bin: 'Paper / Glass', angle: '125°' },
    { bin: 'Unknown', angle: '160°' }
  ]
};

export const adminData = {
  users: [
    { name: 'Project Admin', role: 'Admin', status: 'Active' },
    { name: 'Lab Operator', role: 'Operator', status: 'Active' },
    { name: 'Supervisor View', role: 'Viewer', status: 'Read-only' }
  ],
  auditLogs: [
    { time: '12:10 PM', action: 'Organic bin marked for attention', actor: 'System' },
    { time: '12:04 PM', action: 'Unknown waste alert generated', actor: 'System' },
    { time: '11:55 AM', action: 'Metal waste routed successfully', actor: 'ESP32' },
    { time: '11:30 AM', action: 'Calibration page viewed', actor: 'Admin' }
  ],
  actions: [
    'Restart Device',
    'Clear Alerts',
    'Reset Daily Statistics',
    'Export Daily Report',
    'Run Sensor Test',
    'Run Servo Test'
  ]
};
