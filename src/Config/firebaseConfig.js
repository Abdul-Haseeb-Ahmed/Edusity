import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCbLMZxBL6iQC9FMix8GJDWonK87v4XKMI",
  authDomain: "edusity-ce321.firebaseapp.com",
  projectId: "edusity-ce321",
  storageBucket: "edusity-ce321.firebasestorage.app",
  messagingSenderId: "431170283570",
  appId: "1:431170283570:web:1d335765d9e507095ef42b",
  measurementId: "G-HLYWMCYMWQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;