import React from 'react';

const Login = () => (
  <div className="login-page">
    <img src="https://i.imgur.com/mCSoavu.png" alt="news stand" className="logo" />
    <div className="form">
      <div className="login-form">
        <a href="/auth/google">
          <button className="loginBtn loginBtn--google">
            Login with Google
          </button>
        </a>
      </div>
    </div>
  </div>
);

export default Login;
