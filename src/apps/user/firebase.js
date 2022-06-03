import {initializeApp} from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import {startLoading} from "../../components/loadingAnimation";
import httpService from "../../components/httpService";
import {apiEndpoint, serverUrls, urls} from "../../configuration";
import {setJwt, setRefreshToken} from "../../components/authService";

const firebaseConfig = {
    apiKey: "AIzaSyDENzSzanmiPxPexRgJllDRgvARkAS4Owk",
    authDomain: "b12j-329202.firebaseapp.com",
    projectId: "b12j-329202",
    storageBucket: "b12j-329202.appspot.com",
    messagingSenderId: "44233356796",
    appId: "1:44233356796:web:ff616e4b70fe3cb8882e79",
    measurementId: "G-2JL8QR3HNM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const accessToken = res.user.accessToken;

        try {
            startLoading("Syncing with server...");
            const res = await httpService.post(`${apiEndpoint}${serverUrls.loginWithGoogle}/`,
                {"id_token": accessToken}
            );
            const {access, refresh} = res.data;
            setJwt(access);
            setRefreshToken(refresh);
            window.location = urls.profile
        } catch (ex) {
            if (ex.response && (ex.response.status === 400 || ex.response.status === 401)) {
                const errors = {...this.state.errors, username: "Synchronization failed!. Try again later."};
                this.setState({errors});
            }
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};


const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};