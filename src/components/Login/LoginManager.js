import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
};

export const handleGoogleSignIn = () => {
    const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(GoogleProvider)
        .then((result) => {
            const { displayName, email, photoURL } = result.user;
            const signInUser = {
                isLoggedIn: true,
                success: true,
                name: displayName,
                email: email,
                photo: photoURL,
            };
            return signInUser;
        });
};

export const handleSignOut = () => {
    return firebase
        .auth()
        .signOut()
        .then((res) => {
            const signOutUser = {
                isLoggedIn: false,
                success: false,
                name: "",
                email: "",
                photo: "",
                error: "",
            };
            return signOutUser;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const createUserWithEmailandPassword = (name, email, password) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = "";
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
};

export const loginWithEmailAndPassword = (email, password) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = "";
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
};

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
    })
        .then(function () {
            console.log("User name Updated successfully");
        })
        .catch(function (error) {
            console.log(error);
        });
};
