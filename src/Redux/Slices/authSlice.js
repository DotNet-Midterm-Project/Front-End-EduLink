import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/Account/login`, { email, password });
      const data = response.data;
      console.log(response.data);
      
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('roles', JSON.stringify(data.roles));
      localStorage.setItem('userName', data.userName);
      localStorage.setItem('email', data.email);

      return { data };
    } catch (error) {
      console.log(error);
      
      return rejectWithValue('Login failed, please check your credentials.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || '',
    roles: (() => {
      try {
        return JSON.parse(localStorage.getItem('roles')) || [];
      } catch (e) {
        console.error("Error parsing roles from localStorage", e);
        return [];
      }
    })(),
    user: localStorage.getItem('userName') || '',
    email: localStorage.getItem('email') || '',
    error: '',
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.token = '';
      state.user = '';
      state.email = '';
      state.roles = '';
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
      localStorage.removeItem('userName');
      localStorage.removeItem('email');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        const { accessToken, userName, roles, email } = action.payload.data;
        state.token = accessToken;
        state.user = userName;
        state.roles = roles;
        state.email = email;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
