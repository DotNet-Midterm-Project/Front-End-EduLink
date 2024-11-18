import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllEvent = createAsyncThunk(
  "event/fetchAllEvent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/Common/get-all-Workshops`,
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

// This when the student join the event
export const fetchEventContent = createAsyncThunk(
  "event/fetchEventContent",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/Common/get-event-content`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            eventId: eventId, // Pass eventId as a query parameter
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

// Fetch events by volunteer and course
export const fetchEventsByVolunteerAndCourse = createAsyncThunk(
  "courses/fetchEventsByVolunteerAndCourse",
  async ({ volunteerID, courseID }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL_BACKEND
        }/api/Common/get-events-by-volunteer-and-course`,
        {
          params: { volunteerID, courseID },
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

const bookinEventgSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    eventContent: [],
    selectedEvent: null,
    loading: false,
    error: "",
  },
  reducers: {
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvent.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAllEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.workshops;
      })
      .addCase(fetchAllEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Handle event content fetch cases
      .addCase(fetchEventContent.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchEventContent.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Handle Fetch events by volunteer and course
      .addCase(fetchEventsByVolunteerAndCourse.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchEventsByVolunteerAndCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.eventContent = action.payload || [];
      })
      .addCase(fetchEventsByVolunteerAndCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { clearSelectedEvent } = bookinEventgSlice.actions;
export default bookinEventgSlice.reducer;
