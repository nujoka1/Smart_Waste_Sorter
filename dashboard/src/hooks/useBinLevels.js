import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { bins as mockBins } from '../data/mockData.js';

const SYSTEM_ID = 'waste_sorter_001';

const BIN_ORDER = [
  'Plastic',
  'Metal',
  'Wet / Organic',
  'Paper / Glass',
  'Unknown'
];

export function useBinLevels() {
  const [bins, setBins] = useState(mockBins);

  useEffect(() => {
    const ref = collection(db, 'systems', SYSTEM_ID, 'bins');

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const liveBins = snapshot.docs.map((docSnap) => ({
          firestoreId: docSnap.id,
          ...docSnap.data()
        }));

        if (liveBins.length > 0) {
          liveBins.sort((a, b) => {
            return BIN_ORDER.indexOf(a.type) - BIN_ORDER.indexOf(b.type);
          });

          setBins(liveBins);
        }
      },
      (error) => {
        console.error('[Firestore] useBinLevels failed:', error);
        setBins(mockBins);
      }
    );

    return () => unsubscribe();
  }, []);

  return { bins };
}
