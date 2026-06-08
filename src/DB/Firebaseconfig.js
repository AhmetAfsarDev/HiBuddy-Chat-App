



  import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, serverTimestamp } from "firebase/database";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,           
  browserSessionPersistence 
} from "firebase/auth";

const firebaseConfig = {
 //Firebase data
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); 

const validateUsername = (username) => /^[a-zA-Z0-9_]{3,20}$/.test(username);
const validateNumber = (number) => /^[0-9]{10,15}$/.test(number);
const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

function Signupdatasend(username, number, password) {
  const cleanUsername = username ? username.trim() : "";
  const cleanNumber = number ? number.replace(/[^0-9]/g, "") : "";

  if (!validateUsername(cleanUsername)) {
    return Promise.reject(new Error("Geçersiz kullanıcı adı. Sadece harf, rakam ve alt çizgi (3-20 karakter)."));
  }
  if (!validateNumber(cleanNumber)) {
    return Promise.reject(new Error("Geçersiz telefon numarası formatı. En az 10 haneli geçerli bir numara girilmelidir."));
  }
  if (!validatePassword(password)) {
    return Promise.reject(new Error("Şifre yetersiz. En az 8 karakter olmalı, en az bir harf ve bir rakam içermelidir."));
  }

  const secureEmail = `${cleanNumber}@hibuddy.com`;

  return setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return createUserWithEmailAndPassword(auth, secureEmail, password)
        .then((userCredential) => {
          const user = userCredential.user;
          
          const writePrivate = set(ref(database, `users/${user.uid}`), {
            username: cleanUsername,
            number: cleanNumber,
            Profile: "Active",
            createdAt: serverTimestamp()
          });

          const writePublic = set(ref(database, `public_profiles/${user.uid}`), {
            username: cleanUsername,
            Profile: "Active"
          });

          return Promise.all([writePrivate, writePublic]).then(() => true);
        });
    })
    .catch((error) => {
      let friendlyMessage = "Kayıt sırasında bir hata oluştu.";
      if (error.code === "auth/email-already-in-use") {
        friendlyMessage = "Bu telefon numarası ile daha önce bir hesap oluşturulmuş.";
      }
      throw new Error(friendlyMessage);
    });
}

const Loginfunction = (number, password) => {
  const cleanNumber = number ? number.replace(/[^0-9]/g, "") : "";

  if (!validateNumber(cleanNumber) || !password) {
    return Promise.resolve(false);
  }

  const secureEmail = `${cleanNumber}@hibuddy.com`;

  return setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, secureEmail, password).then(() => true);
    })
    .catch((error) => {
      return false;
    });
};

async function Usernameprint() {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const snapshot = await get(ref(database, `users/${user.uid}`));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    return null;
  }
}

export { app, database, auth, Signupdatasend, Loginfunction, Usernameprint, onAuthStateChanged, serverTimestamp };
