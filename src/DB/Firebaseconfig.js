
  
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";

const firebaseConfig = {

//Firebase data app

};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); 


function Signupdatasend(username, number, password) {

  const secureEmail = `${number}@hibuddy.com`;

  return createUserWithEmailAndPassword(auth, secureEmail, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
    
      return set(ref(database, `users/${user.uid}`), {
        username: username,
        number: number,
        Profile: "Active",
      });
    });
}


const Loginfunction = (number, password) => {
  const secureEmail = `${number}@hibuddy.com`;


  return signInWithEmailAndPassword(auth, secureEmail, password)
    .then(() => {
      return true; 
    })
    .catch((error) => {
      console.error("Giriş yapılamadı:", error.message);
      return false; 
    });
};

export { app, database, auth, Signupdatasend, Loginfunction };
