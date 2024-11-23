import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllVolunteers = createAsyncThunk(
  "volunteers/fetchAllVolunteers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/Admin/get-all-volunteers`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: "An error occurred" }
      );
    }
  }
);


const volunteerSlice = createSlice({
  name: "volunteers",
  initialState: {
    volunteers: [], 
    loading: false,
    error: "", 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVolunteers.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAllVolunteers.fulfilled, (state, action) => {
        console.log("Fetched Volunteers:", action.payload);
        state.loading = false;
        state.volunteers = action.payload; 
      })
      .addCase(fetchAllVolunteers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch volunteers.";
      });
  },
});

export default volunteerSlice.reducer;
