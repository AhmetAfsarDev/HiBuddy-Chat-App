import { useState, useEffect } from 'react'
import './App.css'
import Loginpage from './Login.jsx'
import Signup from "./Sign-up.jsx"
import MessageBox from "./Messagebox.jsx"

function App() {

  const [activeComponent, setactivecomponent] = useState("Signup");
  const [Logincontrol, Setlogincontrol] = useState("");

  useEffect(() => {
    if (Logincontrol === "Online") {
      
      setactivecomponent("Messagebox");
      

      
    }
  }, [Logincontrol]);

  return (
    <div className="App">
      {activeComponent === "Signup" && <Signup Login={setactivecomponent} />}
      {activeComponent === "Login" && <Loginpage Logincheckdata={Setlogincontrol} CBFPE={setactivecomponent} />}
      {activeComponent === "Messagebox" && <MessageBox />}
    </div>
  )
}

export default App