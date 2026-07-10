import { doc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../src/config/firebase.js';
import {
  systemState,
  bins,
  todayStats,
  recentEvents,
  alerts,
  deviceHealth,
  calibration,
  adminData
} from '../src/data/mockData.js';

const SYSTEM_ID = 'waste_sorter_001';

function binDocId(type) {
  return type
    .toLowerCase()
    .replaceAll(' / ', '_')
    .replaceAll('/', '_')
    .replaceAll(' ', '_');
}

async function seedFirestore() {
  console.log('[SEED] Starting Firestore seed...');

  await setDoc(doc(db, 'systems', SYSTEM_ID), {
    ...systemState,
    todayStats,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  console.log('[SEED] System document written.');

  for (const bin of bins) {
    const id = binDocId(bin.type);

    await setDoc(doc(db, 'systems', SYSTEM_ID, 'bins', id), {
      ...bin,
      id,
      updatedAt: serverTimestamp()
    });

    console.log(`[SEED] Bin written: ${id}`);
  }

  await setDoc(doc(db, 'systems', SYSTEM_ID, 'device_health', 'current'), {
    ...deviceHealth,
    updatedAt: serverTimestamp()
  });

  console.log('[SEED] Device health written.');

  await setDoc(doc(db, 'systems', SYSTEM_ID, 'calibration', 'current'), {
    ...calibration,
    updatedAt: serverTimestamp()
  });

  console.log('[SEED] Calibration written.');

  await setDoc(doc(db, 'systems', SYSTEM_ID, 'admin', 'current'), {
    users: adminData.users,
    actions: adminData.actions,
    updatedAt: serverTimestamp()
  });

  console.log('[SEED] Admin document written.');

  for (const event of recentEvents) {
    await addDoc(collection(db, 'systems', SYSTEM_ID, 'events'), {
      ...event,
      timestamp: serverTimestamp()
    });
  }

  console.log('[SEED] Events written.');

  for (const alert of alerts) {
    await addDoc(collection(db, 'systems', SYSTEM_ID, 'alerts'), {
      ...alert,
      triggered_at: serverTimestamp(),
      acknowledged: false
    });
  }

  console.log('[SEED] Alerts written.');

  for (const log of adminData.auditLogs) {
    await addDoc(collection(db, 'systems', SYSTEM_ID, 'admin_logs'), {
      ...log,
      timestamp: serverTimestamp()
    });
  }

  console.log('[SEED] Admin logs written.');
  console.log('[SEED] Firestore seed complete.');
}

seedFirestore()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('[SEED ERROR]', error);
    process.exit(1);
  });
