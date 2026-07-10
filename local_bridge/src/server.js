import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const PORT = Number(process.env.PORT || 8088);
const SYSTEM_ID = 'waste_sorter_001';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = express();

app.use(cors());
app.use(express.json({ limit: '256kb' }));

function safeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function nowTimeString() {
  return new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}

function normalizeBinId(category) {
  const value = String(category || 'unknown').toLowerCase();

  if (value.includes('plastic')) return 'plastic';
  if (value.includes('metal')) return 'metal';
  if (value.includes('organic') || value.includes('wet')) return 'wet_organic';
  if (value.includes('paper') || value.includes('glass')) return 'paper_glass';

  return 'unknown';
}

function normalizeBinName(category) {
  const id = normalizeBinId(category);

  const names = {
    plastic: 'Plastic',
    metal: 'Metal',
    wet_organic: 'Wet / Organic',
    paper_glass: 'Paper / Glass',
    unknown: 'Unknown'
  };

  return names[id] || 'Unknown';
}

async function incrementSystemStats(category, confidence) {
  const systemRef = doc(db, 'systems', SYSTEM_ID);

  const binId = normalizeBinId(category);
  const isUnknown = binId === 'unknown';
  const isOrganic = binId === 'wet_organic';
  const isRecyclable = ['plastic', 'metal', 'paper_glass'].includes(binId);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(systemRef);
    const data = snap.exists() ? snap.data() : {};
    const stats = data.todayStats || {};

    const totalItems = safeNumber(stats.totalItems) + 1;
    const unknownItems = safeNumber(stats.unknownItems) + (isUnknown ? 1 : 0);
    const organicItems = safeNumber(stats.organicItems) + (isOrganic ? 1 : 0);
    const recyclableItems = safeNumber(stats.recyclableItems) + (isRecyclable ? 1 : 0);

    const previousAverage = safeNumber(stats.averageConfidence);
    const newConfidence = safeNumber(confidence);

    const averageConfidence = Math.round(
      ((previousAverage * Math.max(totalItems - 1, 0)) + newConfidence) / totalItems
    );

    const sortingAccuracy = totalItems > 0
      ? Math.round(((totalItems - unknownItems) / totalItems) * 100)
      : 0;

    tx.set(systemRef, {
      status: 'online',
      lastSync: nowTimeString(),
      todayStats: {
        ...stats,
        totalItems,
        unknownItems,
        organicItems,
        recyclableItems,
        averageConfidence,
        sortingAccuracy
      },
      updatedAt: serverTimestamp()
    }, { merge: true });
  });
}

app.get('/', (req, res) => {
  res.json({
    ok: true,
    service: 'Smart Waste Sorter Local Bridge',
    systemId: SYSTEM_ID,
    endpoints: [
      'POST /ingestEvent',
      'POST /ingestHealth',
      'POST /commandStatus',
      'GET /pendingCommands'
    ]
  });
});

app.post('/ingestEvent', async (req, res) => {
  try {
    const body = req.body || {};

    const category = body.category || 'Unknown';
    const confidence = safeNumber(body.confidence, 0);
    const binId = normalizeBinId(category);
    const binName = normalizeBinName(category);

    await addDoc(collection(db, 'systems', SYSTEM_ID, 'events'), {
      time: body.time || nowTimeString(),
      category,
      confidence,
      bin: body.bin || `${binName} Bin`,
      status: body.status || (binId === 'unknown' ? 'Review' : 'Sorted'),
      sensorReadings: body.sensorReadings || {},
      routing: body.routing || {},
      binStatus: body.binStatus || {},
      source: 'esp32_local_bridge',
      timestamp: serverTimestamp()
    });

    await incrementSystemStats(category, confidence);

    if (body.binStatus && typeof body.binStatus.fill !== 'undefined') {
      const fill = safeNumber(body.binStatus.fill);
      const status = fill >= 95 ? 'full' : fill >= 80 ? 'warning' : 'ok';

      await setDoc(doc(db, 'systems', SYSTEM_ID, 'bins', binId), {
        type: binName,
        fill,
        status,
        recommendedAction: status === 'full'
          ? 'Empty immediately'
          : status === 'warning'
            ? 'Empty soon'
            : 'Normal operation',
        updatedAt: serverTimestamp()
      }, { merge: true });
    }

    if (binId === 'unknown') {
      await addDoc(collection(db, 'systems', SYSTEM_ID, 'alerts'), {
        severity: 'warning',
        title: 'Unknown waste detected',
        message: 'Item was routed to the Unknown bin for manual review.',
        acknowledged: false,
        triggered_at: serverTimestamp()
      });
    }

    res.json({
      ok: true,
      message: 'Event ingested'
    });
  } catch (error) {
    console.error('[ingestEvent]', error);
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.post('/ingestHealth', async (req, res) => {
  try {
    const body = req.body || {};

    await setDoc(doc(db, 'systems', SYSTEM_ID, 'device_health', 'current'), {
      ...body,
      updatedAt: serverTimestamp()
    }, { merge: true });

    await setDoc(doc(db, 'systems', SYSTEM_ID), {
      status: body.esp32 || 'online',
      wifiSignal: safeNumber(body.wifiSignal, -100),
      firmwareVersion: body.firmwareVersion || 'unknown',
      uptime: body.uptime || 'unknown',
      lastSync: nowTimeString(),
      updatedAt: serverTimestamp()
    }, { merge: true });

    res.json({
      ok: true,
      message: 'Health ingested'
    });
  } catch (error) {
    console.error('[ingestHealth]', error);
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.get('/pendingCommands', async (req, res) => {
  try {
    const commandsRef = collection(db, 'systems', SYSTEM_ID, 'commands');

    // Lightweight: dashboard is not producing high volume.
    // The ESP32 bridge will return all recent docs and firmware can pick pending.
    const { getDocs } = await import('firebase/firestore');
    const snap = await getDocs(commandsRef);

    const commands = snap.docs
      .map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }))
      .filter((cmd) => cmd.status === 'pending');

    res.json({
      ok: true,
      commands
    });
  } catch (error) {
    console.error('[pendingCommands]', error);
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.post('/commandStatus', async (req, res) => {
  try {
    const body = req.body || {};

    if (!body.commandId) {
      res.status(400).json({
        ok: false,
        error: 'commandId is required'
      });
      return;
    }

    await setDoc(doc(db, 'systems', SYSTEM_ID, 'commands', body.commandId), {
      status: body.status || 'completed',
      result: body.result || null,
      processedAt: serverTimestamp()
    }, { merge: true });

    await addDoc(collection(db, 'systems', SYSTEM_ID, 'admin_logs'), {
      time: nowTimeString(),
      action: `Bridge updated command ${body.commandId} to ${body.status || 'completed'}`,
      actor: 'Local Bridge',
      commandId: body.commandId,
      timestamp: serverTimestamp()
    });

    res.json({
      ok: true,
      message: 'Command status updated'
    });
  } catch (error) {
    console.error('[commandStatus]', error);
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[BRIDGE] Smart Waste Sorter bridge running on port ${PORT}`);
  console.log(`[BRIDGE] Local:   http://localhost:${PORT}`);
  console.log(`[BRIDGE] Network: http://YOUR_LAPTOP_IP:${PORT}`);
});
