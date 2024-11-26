import { configureStore } from '@reduxjs/toolkit';
import articlesSlice from './Slices/articlesSlice';
import authReducer from './Slices/authSlice';
import likeReducer from './Slices/Like';
import commentReducer from '../Redux/Slices/commentsSlice';
import coursesReducer from '../Redux/Slices/CourseSlice';
import event  from './Slices/bookingEventSlice';
import registerAsVolunteerSlice from '../Redux/Slices/registerAsVolunteerSlice';

import volunteerReducer from '../Redux/Slices/VolunteerSlice';

import departmentSlice from '../Redux/Slices/adminDepartmentSlice';
import adminCourseSlice from './Slices/adminCoursesSlice';
import ImageSlice from './Slices/ImageProfileSlice';

export const store = configureStore({
  reducer: {
    departments: departmentSlice,
    adminCourses: adminCourseSlice,
    auth: authReducer,
    articles: articlesSlice,
    like: likeReducer,
    comments: commentReducer,
    courses: coursesReducer,
    bookingEvent: event,
    profile: ImageSlice,
    registerAsVolunteerSlice: registerAsVolunteerSlice,
    volunteer: volunteerReducer,
  },
});

export default store;
