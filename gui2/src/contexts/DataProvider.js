// contexts/DataProvider.js
import React from 'react';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import DataContext from './DataContext';

export default function DataProvider({ children, db }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Alerts"), snapshot => {
      const fetchedData = snapshot.docs.map(doc => doc.data());
      setData(fetchedData);
      console.log(fetchedData);
    });

    return () => unsubscribe();
  }, [db]);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
}
