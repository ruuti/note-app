import * as firebase from 'firebase';
import { FirebaseConfig } from "./config";

// Initialize Firebase database
firebase.initializeApp(FirebaseConfig);
const database = firebase.database();

export const notesRef = database.ref('notes');
export const categoryRef = database.ref('categories');

export default database;