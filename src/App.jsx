import React from "react";
import ArticlesList from "./Pages/Article/ArticlesList";
import ArticlesListByID from "./Pages/Article/ArticlesListByID";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Layout from './Components/Layout';
import StudentPage from "./Pages/Student/StudentPage";
import Profile from "./Pages/Profile";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import VerifyEmailPage from "./Components/Common/verifyEmail";
import ResetPassword from "./Pages/Auth/ResetPassword";
import BookingPage from "./Pages/Student/BookingPage";
import EventPage from "./Pages/Student/EventPage";
import EventContentPage  from "./Pages/Student/EventContentPage";
import ShowVolunteerByCourse from "./Components/Student/ShowVolunteerByCourse";

const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/verify" element={<Layout><VerifyEmailPage /></Layout>} />
          <Route path="/articles" element={<Layout><ArticlesList /></Layout>} />
          <Route path="/articles/:id" element={<Layout><ArticlesListByID /></Layout>} />
          <Route path="/" element={<Home />}/>
          <Route path="/student-page" element={<Layout><StudentPage/></Layout>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/booking-page" element={<Layout><BookingPage/></Layout>}/>
          <Route path="/event-page" element={<Layout><EventPage/></Layout>}/>
          <Route path="/event-content/:eventId" element={<EventContentPage />} />
          <Route path="/volunteers/:courseId" element={<ShowVolunteerByCourse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
