import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { deviceHealth as mockDeviceHealth } from '../data/mockData.js';

const SYSTEM_ID = 'waste_sorter_001';

export function useDeviceHealth() {
  const [health, setHealth] = useState(mockDeviceHealth);

  useEffect(() => {
    const ref = doc(db, 'systems', SYSTEM_ID, 'device_health', 'current');

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          setHealth((previous) => ({
            ...previous,
            ...snapshot.data()
          }));
        }
      },
      (error) => {
        console.error('[Firestore] useDeviceHealth failed:', error);
        setHealth(mockDeviceHealth);
      }
    );

    return () => unsubscribe();
  }, []);

  return { health };
}
