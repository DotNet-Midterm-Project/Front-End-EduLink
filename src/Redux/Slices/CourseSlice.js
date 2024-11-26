import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// @ Fetch all courses for student
export const fetchAllCourses = createAsyncThunk(
  "courses/fetchAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/Student/get-all-courses`,
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

// Fetch all volunteers by course id (Note: this function is not used in the provided code)
export const fetchAllVolunteerByCourseId = createAsyncThunk(
  "courses/fetchAllVolunteerByCourseId",
  async ({ CourseID }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL_BACKEND
        }/api/Student/get-volunteers-for-course/${CourseID}`,
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

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    volunteers: [],
    events: [],
    selectedCourse: null,
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload || {};
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchAllVolunteerByCourseId.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAllVolunteerByCourseId.fulfilled, (state, action) => {
        state.loading = false;
        state.volunteers = action.payload || [];
      })
      .addCase(fetchAllVolunteerByCourseId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default courseSlice.reducer;
