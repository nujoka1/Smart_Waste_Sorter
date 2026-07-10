import { useEffect, useState } from 'react';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { recentEvents as mockEvents } from '../data/mockData.js';

const SYSTEM_ID = 'waste_sorter_001';

export function useRecentEvents() {
  const [events, setEvents] = useState(mockEvents);

  useEffect(() => {
    const ref = query(
      collection(db, 'systems', SYSTEM_ID, 'events'),
      orderBy('timestamp', 'desc'),
      limit(20)
    );

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const liveEvents = snapshot.docs.map((docSnap) => ({
          firestoreId: docSnap.id,
          ...docSnap.data()
        }));

        if (liveEvents.length > 0) {
          setEvents(liveEvents);
        }
      },
      (error) => {
        console.error('[Firestore] useRecentEvents failed:', error);
        setEvents(mockEvents);
      }
    );

    return () => unsubscribe();
  }, []);

  return { events };
}
