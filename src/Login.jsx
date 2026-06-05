import React, { useRef } from 'react';
import './App.css';
import { Loginfunction } from "./DB/Firebaseconfig";

function Login({ CBFPE, Logincheckdata }) {

  const numberRef = useRef(null);
  const passwordRef = useRef(null);

  const LoginF = async () => {
    const Numberdata = numberRef.current;
    const Passworddata = passwordRef.current;

    if (!Numberdata || !Passworddata || !Numberdata.value.trim() || !Passworddata.value.trim()) {
      console.log("Lütfen tüm alanları doldurunuz.");
      return;
    }


    const isSuccess = await Loginfunction(Numberdata.value, Passworddata.value);

    if (isSuccess) {
      Logincheckdata("Online");
    } else {
      console.log("Hatalı telefon numarası veya şifre!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="l-container">

          <div className="logo-container">
            <img src="/Hibuddylogo.png" alt="HiBuddy Logo" />
          </div>

          <input
            type="tel"
            placeholder="Telefon numaranızı giriniz..."
            className="Numberinput"
            ref={numberRef}
          />

          <input
            type="password"
            placeholder="Şifrenizi giriniz..."
            className="Passwordinput"
            ref={passwordRef}
          />

          <button onClick={LoginF} type="button">
            Giriş yap
          </button>

          <div className="login-info-container">
            <p>
              Hibuddy hesabın yok mu? Hemen{" "}
              <button onClick={() => { CBFPE("Signup") }} type="button">
                Kayıt ol
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
