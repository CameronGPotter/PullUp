import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig"
import { auth } from "../firebaseConfig";

export async function signIn(email: string, password: string) {
    return new Promise(function (resolve, reject) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log("ayo")
                resolve(true);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                reject(Error(false));
            });
        
    });
    console.log("ayo3");

    //TODO reverse signinwithemailandpassword and promise maybe?
}