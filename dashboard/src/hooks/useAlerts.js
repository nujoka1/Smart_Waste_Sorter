import { useEffect, useState } from 'react';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { alerts as mockAlerts } from '../data/mockData.js';

const SYSTEM_ID = 'waste_sorter_001';

export function useAlerts() {
  const [alerts, setAlerts] = useState(mockAlerts);

  useEffect(() => {
    const ref = query(
      collection(db, 'systems', SYSTEM_ID, 'alerts'),
      orderBy('triggered_at', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const liveAlerts = snapshot.docs.map((docSnap) => ({
          firestoreId: docSnap.id,
          ...docSnap.data()
        }));

        if (liveAlerts.length > 0) {
          setAlerts(liveAlerts);
        }
      },
      (error) => {
        console.error('[Firestore] useAlerts failed:', error);
        setAlerts(mockAlerts);
      }
    );

    return () => unsubscribe();
  }, []);

  return { alerts };
}
