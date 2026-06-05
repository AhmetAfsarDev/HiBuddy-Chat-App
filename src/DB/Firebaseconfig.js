
  

import { initializeApp } from "firebase/app";
import { getDatabase, ref, push,get } from "firebase/database";

const firebaseConfig = {

//Firebase app data

};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function Signupdatasend(username, number, password) {
  return push(ref(database, "users"), {
    username,
    number,
    password,
    Profile:"Active",
  });
}
const Loginfunction = () => {
  console.log("Fonksiyon Çalıştı");

  return get(ref(database, "users"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()); 
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.log("Giriş yapılamadı", error);
      return [];
    });
};

export { app, database, Signupdatasend ,Loginfunction};