import { useState, useEffect } from 'react'
import './App.css'
import Loginpage from './Login.jsx'
import Signup from "./Sign-up.jsx"
import MessageBox from "./Messagebox.jsx"
import { auth, onAuthStateChanged } from "./DB/Firebaseconfig"

function App() {
  const [activeComponent, setactivecomponent] = useState("Signup");
  const [Logincontrol, Setlogincontrol] = useState("");

  useEffect(() => {
    // Güvenlik Duvarı: Dinleyici boş bağımlılık dizisiyle kararlı hale getirildi
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        Setlogincontrol("Online");
        setactivecomponent("Messagebox");
      } else {
        Setlogincontrol("");
        // Fonksiyonel güncelleme (prev) kullanılarak stale closure açığı kapatıldı
        setactivecomponent((prev) => (prev === "Messagebox" ? "Login" : prev));
      }
    });
    return () => unsubscribe();
  }, []); // Bağımlılık dizisi optimize edildi, sonsuz döngü engellendi

  return (
    <div className="App">
      {activeComponent === "Signup" && <Signup Login={setactivecomponent} />}
      {activeComponent === "Login" && <Loginpage Logincheckdata={Setlogincontrol} CBFPE={setactivecomponent} />}
      {activeComponent === "Messagebox" && <MessageBox />}
    </div>
  )
}

export default App;
