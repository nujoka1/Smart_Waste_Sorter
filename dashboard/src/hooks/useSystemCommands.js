import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  doc
} from 'firebase/firestore';
import { db } from '../config/firebase.js';

const SYSTEM_ID = 'waste_sorter_001';

function normalizeCommand(action) {
  return action
    .toLowerCase()
    .replaceAll(' ', '_')
    .replaceAll('/', '_');
}

export function useSystemCommands() {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    const ref = query(
      collection(db, 'systems', SYSTEM_ID, 'commands'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const liveCommands = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }));

        setCommands(liveCommands);
      },
      (error) => {
        console.error('[Firestore] Command history failed:', error);
        setCommands([]);
      }
    );

    return () => unsubscribe();
  }, []);

  async function sendCommand(action) {
    const command = {
      action,
      command: normalizeCommand(action),
      status: 'pending',
      source: 'dashboard_admin',
      systemId: SYSTEM_ID,
      createdAt: serverTimestamp(),
      processedAt: null,
      result: null
    };

    const ref = await addDoc(
      collection(db, 'systems', SYSTEM_ID, 'commands'),
      command
    );

    await addDoc(
      collection(db, 'systems', SYSTEM_ID, 'admin_logs'),
      {
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        action: `Command issued: ${action}`,
        actor: 'Admin',
        commandId: ref.id,
        timestamp: serverTimestamp()
      }
    );

    return ref.id;
  }

  async function updateCommandStatus(commandId, status, result = null) {
    const commandRef = doc(db, 'systems', SYSTEM_ID, 'commands', commandId);

    await updateDoc(commandRef, {
      status,
      result,
      processedAt: serverTimestamp()
    });

    await addDoc(
      collection(db, 'systems', SYSTEM_ID, 'admin_logs'),
      {
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        action: `Command ${status}: ${commandId}`,
        actor: 'Admin',
        commandId,
        timestamp: serverTimestamp()
      }
    );
  }

  return {
    commands,
    sendCommand,
    updateCommandStatus
  };
}
