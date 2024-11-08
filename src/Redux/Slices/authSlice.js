import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/Account/login`, { email, password });
      const { accessToken, roles } = response.data;
      console.log(response.data);
      
      localStorage.setItem('token', accessToken);
      localStorage.setItem('roles', roles);

      return { accessToken, roles };
    } catch (error) {
      return rejectWithValue('Login failed, please check your credentials.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || '',
    roles: localStorage.getItem('roles') || '',
    user: null,
    error: '',
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.token = '';
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
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
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
