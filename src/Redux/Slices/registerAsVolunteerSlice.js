import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerAsVolunteer = createAsyncThunk(
  "student/registerAsVolunteer",
  async (data, { rejectWithValue }) => {
    try {
        console.log(data);
        
      const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/Student/register-as-volunteer`,data,
         { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } } );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const registerAsAVolunteer = createSlice({
  name: "register",
  initialState: {
    isLoading: false,
    successMessage: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAsVolunteer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerAsVolunteer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload;
      })
      .addCase(registerAsVolunteer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default registerAsAVolunteer.reducer;
