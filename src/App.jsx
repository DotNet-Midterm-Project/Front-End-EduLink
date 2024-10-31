import React from 'react';
import Login from './Components/Login';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CardArticl from "./Components/Card";
import ArticlesList from './Pages/Article/ArticlesList';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        {/* <Route path='/' element={<CardArticl/>} />  */}
        <Route path='/' element={<ArticlesList/>} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
