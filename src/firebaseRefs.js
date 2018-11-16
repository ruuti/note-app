import firebase from 'firebase/app';
import 'firebase/database';
import { FirebaseConfig } from "./config";

// Initialize Firebase database
firebase.initializeApp(FirebaseConfig);
const db = firebase.database();

export const notesRef = db.ref('notes');
export const categoryRef = db.ref('categories');

export default db;