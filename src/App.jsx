import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import AdminViewAllCourses from "./Pages/Admin/Admin View Courses";
import AdminViewAllDepartments from "./Pages/Admin/AdminViewAllDepartments";
import AdminViewAllVolunteers from "./Pages/Admin/AdminViewAllVolunteer";
import ArticlesList from "./Pages/Article/ArticlesList";
import ArticlesListByID from "./Pages/Article/ArticlesListByID";
import Home from "./Pages/Home/Home";
import Layout from "./Components/Layout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import VerifyEmailPage from "./Components/Common/verifyEmail";
import ResetPassword from "./Pages/Auth/ResetPassword";
import AboutUs from "./Pages/AboutUs";
import StudentPage from "./Pages/Student/StudentPage";
import Profile from "./Pages/Profile";
import BookingPage from "./Pages/Student/BookingPage";
import EventPage from "./Pages/Student/EventPage";
import EventContentPage from "./Pages/Student/EventContentPage";
import ShowVolunteerByCourse from "./Components/Student/ShowVolunteerByCourse";
import YourEvent from "./Pages/Student/YourEvent";


import Volunteers from "./Pages/Volunteer/Volunteers";
import VolunteerDetails from "./Pages/Volunteer/VolunteerDetails";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Contact from "./Pages/contactUS/Contact";
import AddEvent from "./Pages/Volunteer/AddEvent";

// Add all icons to the library
library.add(fas, fab);



import AdminArticles from "./Pages/Admin/AdminViewArticles";
import AddArticle from "./Pages/Volunteer/AddArticle";


const App = () => {
  return (

    <>
      <BrowserRouter>
        <Routes>
        <Route path="/admin" element={<AdminLayout />}>
        
        <Route index element={<Navigate to="volunteers" replace />} /> 
        <Route path="courses" element={<AdminViewAllCourses />} />
        <Route path="departments" element={<AdminViewAllDepartments />} />
        <Route path="Articles" element={<AdminArticles />} />
        <Route path="volunteers" element={<AdminViewAllVolunteers />} />
      </Route>
          <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />
          <Route path="/register" element={<Layout><Register /></Layout>} />
          <Route path="/verify" element={<Layout><VerifyEmailPage /></Layout>} />
          <Route path="/articles" element={<Layout><ArticlesList /></Layout>} />
          <Route path="/articles/:id" element={<Layout><ArticlesListByID /></Layout>} />
          <Route path="/" element={<Home />}/>
          <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
          <Route path="/student-page" element={<Layout><StudentPage/></Layout>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/booking-page" element={<Layout><BookingPage/></Layout>}/>
          <Route path="/event-page" element={<Layout><EventPage/></Layout>}/>
          <Route path="/event-content/:eventId" element={<EventContentPage />} />
          <Route path="/volunteers/:courseId" element={<ShowVolunteerByCourse />} />
          <Route path="/your-event-page" element={<Layout><YourEvent/></Layout>} />
          <Route path="/contact-us" element={<Layout><Contact/></Layout>}/>
          <Route path="/volunteers" element={<Layout><Volunteers/> </Layout>}/>
          <Route path="/volunteerProfile" element={<Layout> <VolunteerDetails /></Layout>}/>
          <Route path = "/add-event" element={<Layout><AddEvent/></Layout>}/>
          <Route path = "/add-article" element={<Layout><AddArticle/></Layout>}/>
        </Routes>
      </BrowserRouter>
    </>

  );
};

export default App;
