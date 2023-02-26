import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig"
import { auth } from "../firebaseConfig";

export function signIn(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log("ayo")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    console.log("ayo3");
}