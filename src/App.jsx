import React from "react";
import ArticlesList from "./Pages/Article/ArticlesList";
import ArticlesListByID from "./Pages/Article/ArticlesListByID";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Layout from './Components/Layout';
import AboutUs from "./Pages/AboutUs";
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
          <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
          <Route path="/student-page" element={<Layout><StudentPage/></Layout>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/booking-page" element={<Layout><BookingPage/></Layout>}/>
          <Route path="/event-page" element={<Layout><EventPage/></Layout>}/>
          <Route path="/event-content/:eventId" element={<EventContentPage />} />
          <Route path="/volunteers/:courseId" element={<ShowVolunteerByCourse />} />
          <Route path="/your-event-page" element={<Layout><YourEvent/></Layout>} />
          <Route path="/contact-us" element={<Layout><Contact/></Layout>}/>
          <Route path="/volunteers" element={<Volunteers/> }/>
          <Route path="/volunteerProfile" element={<VolunteerDetails />}/>
          <Route path = "/add-event" element={<AddEvent/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
