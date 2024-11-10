import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import VerifyEmailPage from './Components/Common/verifyEmail';

function App() {
  return (
    <Routes>
     
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/verify" element={<VerifyEmailPage/>} />
    
    </Routes>
  );
}

export default App;
