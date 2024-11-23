import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch all volunteers
export const fetchAllVolunteers = createAsyncThunk(
  "volunteer/fetchAllVolunteers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/Admin/get-all-volunteers`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
     
      return response.data;
    } catch (error) {
      

      return rejectWithValue(
        error.response ? error.response.data : { message: "An error occurred" }
      );
    }
  }
);

export const fetchAllEventsVolunteer = createAsyncThunk(
  "volunteer/fetchAllEventsVolunteer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/Admin/get-all-volunteers`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
     
      return response.data;
    } catch (error) {
      

      return rejectWithValue(
        error.response ? error.response.data : { message: "An error occurred" }
      );
    }
  }
);

// Thunk to fetch all courses for a volunteer
export const FetchAllVolunteerCourses = createAsyncThunk(
  "courses/FetchAllVolunteerCourses",
  async (volunteerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/Common/GetAllCoursesByVolunteerId/${volunteerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
console.log(response.data);

      return response.data;
    } catch (error) {
      
      return rejectWithValue(
        error.response ? error.response.data : { message: "An error occurred" }
      );
    }
  }
);
export const FetchAllVolunteerEvents = createAsyncThunk(
  "volunteers/FetchAllVolunteerEvents",
  async (volunteerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/Common/GetAllEventsByVolunteerId/${volunteerId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
     
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
    volunteers: [], // List of volunteers
    courses: [], // Courses for a specific volunteer
    events: [], // Bookings for a specific volunteer
    loading: false, // General loading state
    error: "", // Error message
  },
  reducers: {}, // If you need synchronous actions, define them here
  extraReducers: (builder) => {
    builder
      // Handle fetching volunteers
      .addCase(fetchAllVolunteers.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAllVolunteers.fulfilled, (state, action) => {
        
        state.loading = false;
        state.volunteers = action.payload || [];
      })
      .addCase(fetchAllVolunteers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred";
      })

      // Handle fetching volunteer courses
      .addCase(FetchAllVolunteerCourses.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(FetchAllVolunteerCourses.fulfilled, (state, action) => {
     
        state.loading = false;
        state.courses = action.payload || [];
      })
      .addCase(FetchAllVolunteerCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred";
      })
      .addCase(FetchAllVolunteerEvents.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(FetchAllVolunteerEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload || [];
      })
      .addCase(FetchAllVolunteerEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred";
      });
  },
});

export default volunteerSlice.reducer;
