import { configureStore } from '@reduxjs/toolkit';
import articlesSlice from './Slices/articlesSlice';
import authReducer from './Slices/authSlice';
import likeReducer from './Slices/LikeComment';
import commentReducer from '../Redux/Slices/commentsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesSlice,
    like: likeReducer,
    comments: commentReducer,
  },
});

export default store;
