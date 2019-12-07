import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCwyHQFh0fhhnmS-RHhYhrfQLbuN--yq3E",
    authDomain: "crown-db-38284.firebaseapp.com",
    databaseURL: "https://crown-db-38284.firebaseio.com",
    projectId: "crown-db-38284",
    storageBucket: "crown-db-38284.appspot.com",
    messagingSenderId: "282105219809",
    appId: "1:282105219809:web:53736acaac824bf33145a0",
    measurementId: "G-9R9FJ5PEL4"
};

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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;