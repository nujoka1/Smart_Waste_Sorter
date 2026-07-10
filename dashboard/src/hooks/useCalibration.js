import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { calibration as mockCalibration } from '../data/mockData.js';

const SYSTEM_ID = 'waste_sorter_001';

export function useCalibration() {
  const [calibration, setCalibration] = useState(mockCalibration);

  useEffect(() => {
    const ref = doc(db, 'systems', SYSTEM_ID, 'calibration', 'current');

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          setCalibration((previous) => ({
            ...previous,
            ...snapshot.data()
          }));
        }
      },
      (error) => {
        console.error('[Firestore] useCalibration failed:', error);
        setCalibration(mockCalibration);
      }
    );

    return () => unsubscribe();
  }, []);

  return { calibration };
}
