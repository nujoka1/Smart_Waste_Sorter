import { useEffect, useState } from 'react';
import { collection, doc, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { adminData as mockAdminData } from '../data/mockData.js';

const SYSTEM_ID = 'waste_sorter_001';

export function useAdminData() {
  const [users, setUsers] = useState(mockAdminData.users);
  const [actions, setActions] = useState(mockAdminData.actions);
  const [auditLogs, setAuditLogs] = useState(mockAdminData.auditLogs);

  useEffect(() => {
    const adminRef = doc(db, 'systems', SYSTEM_ID, 'admin', 'current');

    const unsubscribeAdmin = onSnapshot(
      adminRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();

          if (Array.isArray(data.users)) setUsers(data.users);
          if (Array.isArray(data.actions)) setActions(data.actions);
        }
      },
      (error) => {
        console.error('[Firestore] useAdminData admin failed:', error);
      }
    );

    const logsRef = query(
      collection(db, 'systems', SYSTEM_ID, 'admin_logs'),
      orderBy('timestamp', 'desc'),
      limit(20)
    );

    const unsubscribeLogs = onSnapshot(
      logsRef,
      (snapshot) => {
        const liveLogs = snapshot.docs.map((docSnap) => ({
          firestoreId: docSnap.id,
          ...docSnap.data()
        }));

        if (liveLogs.length > 0) {
          setAuditLogs(liveLogs);
        }
      },
      (error) => {
        console.error('[Firestore] useAdminData logs failed:', error);
      }
    );

    return () => {
      unsubscribeAdmin();
      unsubscribeLogs();
    };
  }, []);

  return {
    users,
    actions,
    auditLogs
  };
}
