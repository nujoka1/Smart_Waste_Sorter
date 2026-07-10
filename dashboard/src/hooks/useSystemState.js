import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { systemState } from '../data/mockData.js';

const SYSTEM_ID = 'waste_sorter_001';

export function useSystemState() {
  const [state, setState] = useState(systemState);

  useEffect(() => {
    const ref = doc(db, 'systems', SYSTEM_ID);

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          setState((previous) => ({
            ...previous,
            ...snapshot.data()
          }));
        }
      },
      (error) => {
        console.error('[Firestore] useSystemState failed:', error);
        setState(systemState);
      }
    );

    return () => unsubscribe();
  }, []);

  return { state };
}
