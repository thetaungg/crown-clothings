import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from "./user.types";

import { auth, googleProvider, createUserProfileDocument} from "../../firebase/firebase.utils";
import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure
} from "./user.actions";
import { getCurrentUser } from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {//basically signIn authentication function
    try{//additionalData is for signing Up
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);//this creates a new user if the user doesn't exist and returns userRef of that user//again, this is the same as >> const userRef = yield creatUserProfileDocument(user)
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    }catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle() {
    try{
        const {user} = yield auth.signInWithPopup(googleProvider); //this will return an obj // but we only want the user property of it/
        yield getSnapshotFromUserAuth(user);
    }catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithEmail({payload: { email, password }}) { //when we caught the action, we also get its payload// we know that payload contains emailAndPassword object
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)
    }catch (error) {
        yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();

        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    }catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    }catch (error) {
        yield put(signOutFailure(error))
    }
}

export function* signUp({payload: { displayName, email, password }}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email,password); //creates user and gives us an object
        yield put(signUpSuccess({user, additionalData: {displayName}}));
    }catch (error) {
        yield put(signUpFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() { //collection of all the userSagas to put in root-saga
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}