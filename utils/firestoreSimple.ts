import { FirestoreSimple } from "@firestore-simple/web";
import firebase from "./firebase";

const firestoreSimple = new FirestoreSimple(firebase.firestore());

export default firestoreSimple;
