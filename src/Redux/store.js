import { configureStore } from '@reduxjs/toolkit';
import articlesSlice from './Slices/articlesSlice';
import authReducer from './Slices/authSlice';
import likeReducer from './Slices/Like';
import commentReducer from '../Redux/Slices/commentsSlice';
import coursesReducer from '../Redux/Slices/CourseSlice';
import event  from './Slices/bookingEventSlice';
import registerAsVolunteerSlice from '../Redux/Slices/registerAsVolunteerSlice';
import volunteerReducer from '../Redux/Slices/VolunteerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesSlice,
    like: likeReducer,
    comments: commentReducer,
    courses: coursesReducer,
    bookingEvent: event,
    registerAsVolunteerSlice: registerAsVolunteerSlice,
    volunteer: volunteerReducer,
  },
});

export default store;
