import React from 'react';
import Login from './Components/Login';
import { useSelector } from 'react-redux';
import ArticlesList from './Pages/Article/ArticlesList';
import ArticlesListByID from './Pages/Article/ArticlesListByID';
import { BrowserRouter, Routes, Route ,Router } from 'react-router-dom';
import CardArticl from "./Components/Card";
import ArticlesList from './Pages/Article/ArticlesList';
import Home from './Pages/Home/Home';
// import Layout from './Pages/Layout';

const App = () => {
  //const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ArticlesList/>} /> 
        <Route path='/articles/:id' element={<ArticlesListByID/>} /> 

        {/* <Route path='/login' element={<Login />} /> */}
        {/* <Route path='/' element={<CardArticl/>} />  */}
        {/* <Route path='/' element={<ArticlesList/>} />  */}
        <Route path='/' element={<Home></Home>}/>


        {/* <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/articles"
          element={
            <Layout>
              <Articles />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
