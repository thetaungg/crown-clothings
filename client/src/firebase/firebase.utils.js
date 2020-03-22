import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: "crown-db-38284",
    storageBucket: "crown-db-38284.appspot.com",
    messagingSenderId: "282105219809",
    appId: "1:282105219809:web:53736acaac824bf33145a0",
    measurementId: "G-9R9FJ5PEL4"
};

firebase.initializeApp(config);


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`); //we're gonna use uid as id
    const snapShot = await userRef.get(); //when you use get method you get back a snapShot Doc. //checking if the user exists

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        //if the user doesn't exit, this'll create a new user
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (error) {
            console.log('error creating user',error.message);
        }
    }
    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => { //for was created for adding shop data into firebase
  const collectionRef = firestore.collection(collectionKey); //finding collectionRef in firestore

  const batch = firestore.batch(); //normally we can't request multiple set request at the same time, so, we need to use batch property

  objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc(); //creating collectionRef with random id firestore gives
      batch.set(newDocRef, obj);
  });
    await batch.commit(); //committing our created collection

};

export const convertCollectionSnapshotToMap = (collections) => {
  const transformedCollections =  collections.docs.map(doc => {
      const {title, items} = doc.data();
      return {
          routeName: encodeURI(title.toLowerCase()), //javascript method that convert any string into url format
          id: doc.id,
          title,
          items
      }
  });
  // console.log(transformedCollections);

    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection; //changing accumulator's key value into collection title and setting its property into each collection// we're making it look like our shop data
        return accumulator;
    },{})
};

export const getCurrentUser = () => {
    return new Promise(( resolve, reject) => { //for sagas to yield // sagas need promises to yield remember
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth)
        }, reject)
    })
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;