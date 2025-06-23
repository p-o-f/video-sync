import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD_YP_cl_lI4eCHTWzuN5_Bjiyb_Y4z7TQ",
  authDomain: "video-sync-10531.firebaseapp.com",
  projectId: "video-sync-10531",
  storageBucket: "video-sync-10531.firebasestorage.app",
  messagingSenderId: "820825199730",
  appId: "1:820825199730:web:13c7ac7ace788a95cb5eeb",
  measurementId: "G-78R129K63L"
};


let app, auth, db;

export function initFirebase() {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);

}

export function getUser() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, user => {
      resolve(user);
    });
  });
}

export function listenForVideos(userEmail, callback) {
  const q1 = query(collection(db, "videos"), where("sharedWith", "==", userEmail));
  const q2 = query(collection(db, "videos"), where("sharedBy", "==", userEmail));

  let sharedWithYou = [], youShared = [];

  onSnapshot(q1, (snapshot) => {
    sharedWithYou = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback({ sharedWithYou, youShared });
  });

  onSnapshot(q2, (snapshot) => {
    youShared = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback({ sharedWithYou, youShared });
  });
}
