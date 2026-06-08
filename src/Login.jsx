import React, { useState } from 'react';
import './App.css';
import { Loginfunction } from "./DB/Firebaseconfig";

function Login({ CBFPE, Logincheckdata }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const LoginF = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    if (!phoneNumber.trim() || !password.trim()) {
      setErrorMessage("Lütfen tüm alanları doldurunuz.");
      return;
    }

    setIsSubmitting(true);

    const isSuccess = await Loginfunction(phoneNumber, password);
    
    setIsSubmitting(false);

    if (isSuccess) {
      Logincheckdata("Online");
    } else {
      setErrorMessage("Hatalı telefon numarası veya şifre!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={LoginF} className="l-container">
          <div className="logo-container">
            <img src="/Hibuddylogo.png" alt="HiBuddy Logo" />
          </div>

          {errorMessage && (
            <div className="premium-error-banner">
              <i className="fa-solid fa-circle-exclamation"></i> {errorMessage}
            </div>
          )}

          <input
            type="tel"
            placeholder="Telefon numaranızı giriniz..."
            className="Numberinput"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isSubmitting}
          />

          <input
            type="password"
            placeholder="Şifrenizi giriniz..."
            className="Passwordinput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
          />

          <button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <span><i className="fa-solid fa-spinner fa-spin"></i> Giriş yapılıyor...</span>
            ) : (
              "Giriş yap"
            )}
          </button>

          <div className="login-info-container">
            <p>
              Hibuddy hesabın yok mu? Hemen{" "}
              <button 
                onClick={() => CBFPE("Signup")} 
                type="button"
                disabled={isSubmitting}
              >
                Kayıt ol
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
