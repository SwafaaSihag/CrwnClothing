import { initializeApp } from 'firebase/app';
import {
     getAuth, 
     signInWithRedirect, 
     signInWithPopup, 
     GoogleAuthProvider, 
     createUserWithEmailAndPassword, 
     signInWithEmailAndPassword,
     signOut,
     onAuthStateChanged,
     } from 'firebase/auth';
import {
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    collection, 
    writeBatch, 
    query, 
    getDocs
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBNTOlSf0-wngXQpgOzZ5lYZruwKcAiC_U",
    authDomain: "crwn-clothing-db-a9c76.firebaseapp.com",
    projectId: "crwn-clothing-db-a9c76",
    storageBucket: "crwn-clothing-db-a9c76.appspot.com",
    messagingSenderId: "256141441061",
    appId: "1:256141441061:web:bfe4b539add774fa7d67cc"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleprovider = new GoogleAuthProvider();

  googleprovider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);

  export const db = getFirestore();

  //because we are adding to an external location i.e firestore we use async function
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    
    //the (object) is from shop-data.js 
    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
  };

  //this is an async function because we are making a retrieval from external source i.e firestore
  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  };

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
      if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exit()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
    
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
      }

      return userSnapshot;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
  };

  export const signOutUser = async () =>await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

  //we are converting an observable listener(which was in app.js), into a promise based function call.
  export const getCurrentUser = () => {
     return new Promise((resolve, reject) => {
      const unSubscribe = onAuthStateChanged(
        auth,
        (userAuth) => {
          unSubscribe();
          resolve(userAuth);
        },
        reject
      )
     })
  }

