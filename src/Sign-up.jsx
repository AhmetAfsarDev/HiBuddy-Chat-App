import React, { useState } from 'react';
import { Signupdatasend } from "./DB/Firebaseconfig";

function Signup({ Login }) {
  const [SUsername, Setusername] = useState("");
  const [SNumber, Setnumber] = useState("");
  const [SPassword, Setpassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const SignupdataF = () => {
    setErrorMsg("");
    if (!SUsername.trim() || !SNumber.trim() || !SPassword.trim()) {
      setErrorMsg("Kayıt olmak için bilgilerin tamamını doldurun");
      return;
    }

    Signupdatasend(SUsername, SNumber, SPassword)
      .then(() => {
        Login("Login"); 
      })
      .catch((error) => {
        setErrorMsg(error.message || "Kayıt sırasında bir hata oluştu.");
      });
  };

  return (
    <div className="Signup-page">
      <div className="Signup-container">
        <div className="l-container">
          <div className="logo-container">
            <img src="/Hibuddylogo.png" alt="HiBuddy Logo" />
          </div>

          {errorMsg && (
            <div className="premium-error-banner">
              <i className="fa-solid fa-circle-exclamation"></i> {errorMsg}
            </div>
          )}

          <input
            className="Usernameinpt"
            type="text"
            placeholder="Kullanıcı adınızı giriniz..."
            value={SUsername}
            onChange={(e) => Setusername(e.target.value)}
          />

          <input
            className="numberinpt"
            type="tel"
            placeholder="Telefon numaranızı giriniz..."
            value={SNumber}
            onChange={(e) => Setnumber(e.target.value)}
          />

          <input
            className="passwordinput"
            type="password"
            placeholder="Şifrenizi giriniz..."
            value={SPassword}
            onChange={(e) => Setpassword(e.target.value)}
          />

          <button onClick={SignupdataF} type="button">
            Kayıt ol
          </button>

          <div className="Signup-info-container">
            <p>
              Hibuddy hesabın var mı?{" "}
              <button onClick={() => Login("Login")} type="button">
                Giriş yap
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
