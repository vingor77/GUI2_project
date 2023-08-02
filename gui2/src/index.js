// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {firebaseConfig} from "./firebaseConfig";
import DataProvider from './contexts/DataProvider';
import { MapProvider } from './contexts/MapContext';
import { getStorage } from "firebase/storage"
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth();
export const storage = getStorage();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider db={db}>
      <MapProvider>
        <App auth={auth}/>
      </MapProvider>
    </DataProvider>
  </React.StrictMode>
);
