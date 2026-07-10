import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { todayStats as mockTodayStats } from '../data/mockData.js';

const SYSTEM_ID = 'waste_sorter_001';

export function useTodayStats() {
  const [stats, setStats] = useState(mockTodayStats);

  useEffect(() => {
    const ref = doc(db, 'systems', SYSTEM_ID);

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();

          if (data.todayStats) {
            setStats((previous) => ({
              ...previous,
              ...data.todayStats
            }));
          }
        }
      },
      (error) => {
        console.error('[Firestore] useTodayStats failed:', error);
        setStats(mockTodayStats);
      }
    );

    return () => unsubscribe();
  }, []);

  return { stats };
}
