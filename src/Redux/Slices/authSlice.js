// Import required modules
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Login async action
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/Account/login`, { email, password });
      const data = response.data;
      console.log(data);
      
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('roles', JSON.stringify(data.roles));
      localStorage.setItem('userName', data.userName);
      localStorage.setItem('email', data.email);
      const profileImage = data.profileImage || 'null'; 
      localStorage.setItem('avatarPreview', profileImage);

      return { data };
    } catch (error) {
      return rejectWithValue('Login failed, please check your credentials.');
    }
  }
);

// Reset password async action
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ newPassword, confirmPassword,token,email}, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/Account/reset-password`, { newPassword, confirmPassword,email,token });
      return response.data;
    } catch (error) {
      return rejectWithValue('Reset password failed. Please try again.');
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
    resetPasswordStatus: '', // To track the reset password status
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
    // Login extra reducers
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

    // Reset password extra reducers
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.resetPasswordStatus = '';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetPasswordStatus = 'Password reset successfully. Please log in with your new password.';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.resetPasswordStatus = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
