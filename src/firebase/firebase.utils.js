import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyDvLUZpIr5J3J_fhD_bkE0cN6iPBUh6igM",
    authDomain: "crown-db-874c1.firebaseapp.com",
    projectId: "crown-db-874c1",
    storageBucket: "crown-db-874c1.appspot.com",
    messagingSenderId: "389097272901",
    appId: "1:389097272901:web:f006c1d8e9b3e01df7152c",
    measurementId: "G-ZDH7XRHBTR"
};

firebase.initializeApp(config);

export const  createUserProfileDocument = async  (userAuth, additionalData) => {
    if (!userAuth) return;

    const  userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;