import { configureStore } from '@reduxjs/toolkit';
import articlesSlice from './Slices/articlesSlice';
import authReducer from './Slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articlesSlice,
  },
});

export default store;
