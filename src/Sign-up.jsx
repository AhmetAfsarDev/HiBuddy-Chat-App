import React, { useState } from 'react'
import { Signupdatasend } from "./DB/Firebaseconfig";

function Signup({ Login }) {

  const [SUsername, Setusername] = useState("");
  const [SNumber, Setnumber] = useState("");
  const [SPassword, Setpassword] = useState("");

  const SignupdataF = () => {

   
    if (
      !SUsername.trim() ||
      !SNumber.trim() ||
      !SPassword.trim()
    ) {
      console.log("Kayıt olmak için bilgilerin tamamını doldurun");
      return;
    }

    Signupdatasend(
      SUsername,
      SNumber,
      SPassword
    )
      .then(() => {
        console.log("Kayıt başarıyla eklendi");
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  };

  return (
    <div className="Signup-page">
      <div className="Signup-container">
        <div className="l-container">

          <div className="logo-container">
            <img src="/Hibuddylogo.png" alt="HiBuddy Logo" />
          </div>

          <input
            className='Usernameinpt'
            type="text"
            placeholder="Kullanıcı adınızı giriniz..."
            onChange={(e) => Setusername(e.target.value)}
          />

          <input
            className='numberinpt'
            type="tel"
            placeholder="Telefon numaranızı giriniz..."
            onChange={(e) => Setnumber(e.target.value)}
          />

          <input
            className='passwordinput'
            type="password"
            placeholder="Şifrenizi giriniz..."
            onChange={(e) => Setpassword(e.target.value)}
          />

          <button onClick={SignupdataF} type="button">
            Kayıt ol
          </button>

          <div className="Signup-info-container">
            <p>
              Hibuddy hesabın var mı?
              <button onClick={() => Login("Login")} type="button">
                Giriş yap
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Signup