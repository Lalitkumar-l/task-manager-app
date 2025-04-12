// src/components/LoginRegister.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? (
        <>
          <Login />
          <p>Don't have an account? <button onClick={() => setIsLogin(false)}>Register</button></p>
        </>
      ) : (
        <>
          <Register />
          <p>Already have an account? <button onClick={() => setIsLogin(true)}>Login</button></p>
        </>
      )}
    </div>
  );
};

export default LoginRegister;
