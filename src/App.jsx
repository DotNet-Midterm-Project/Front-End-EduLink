import React from "react";
import Login from "./Components/Login";
// import { useSelector } from "react-redux";
import ArticlesList from "./Pages/Article/ArticlesList";
import ArticlesListByID from "./Pages/Article/ArticlesListByID";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
// import CardArticl from "./Components/Card";
import Home from "./Pages/Home/Home";
import Layout from './Components/Layout';
import AboutUs from "./Pages/AboutUs";

const App = () => {
  //const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/articles" element={<Layout><ArticlesList /></Layout>} />
          <Route path="/articles/:id" element={<Layout><ArticlesListByID /></Layout>} />
          <Route path="/" element={<Home />}/>
          <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />


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
    </>
  );
};

export default App;
