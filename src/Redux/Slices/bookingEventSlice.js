import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllEvent = createAsyncThunk(
  "event/fetchAllEvent",
  async (CourseID, { rejectWithValue }) => {
    try {
      const url = new URL(`${import.meta.env.VITE_URL_BACKEND}/api/Common/get-all-Workshops`);

      // Append CourseID to the query string if it's provided
      if (CourseID !== undefined && CourseID !== null) {
        url.searchParams.append("CourseID", CourseID);
      }
      const response = await axios.get(url.toString(), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("this is the response",response.data);
      
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

// Async thunk to book a workshop
export const bookAnEvent = createAsyncThunk(
  "workshop/bookWorkshop",
  async (workshopID, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_BACKEND}/api/Student/book-workshop`,
        null,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: { workshopID },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 400) {
        if (error.response.data.includes("already booked")) {
          return rejectWithValue("You have already booked this event.");
        }
      }
      return rejectWithValue(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  }
);
// Convert addEvent to createAsyncThunk
export const addEvent = createAsyncThunk(
  "event/addEvent", // Action type
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_BACKEND}/api/Volunteer/add-event`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
           "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Event added successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding event:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: "Failed to add event." });
    }
  }
);


// This is to fetch all the event 
export const fetchAllbookings = createAsyncThunk(
  "event/fetchgAllbookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL_BACKEND
        }/api/Student/get-bookings`,
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

// This is to delete the event from the Your event page
export const deleteBooking = createAsyncThunk(
  "event/deleteBooking",
  async (BookingId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_URL_BACKEND}/api/Student/delete-booking/${BookingId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
          return rejectWithValue("You have already booked this event.");
      }
      return rejectWithValue(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  }
);

// This is handle the event session
export const fetchAlleventSessions = createAsyncThunk(
  "sessions/fetchAlleventSessions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL_BACKEND
        }/api/Common/get-event-sessions`,
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

const bookinEventgSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    eventContent: [],
    allbookings: [],
    eventSessions: [],
    selectedEvent: null,
    loading: false,
    successMessage: null,
    error: "",
  },
  reducers: {
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
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
        state.events = action.payload.workshops||[];
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
      })
      // Handle booking event
      .addCase(bookAnEvent.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(bookAnEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(bookAnEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })// Handle booking event
        // Handle add event action (converted to AsyncThunk)
    .addCase(addEvent.pending, (state) => {
      state.loading = true;
      state.successMessage = null;
      state.error = null;
    })
    .addCase(addEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    })
    .addCase(addEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
        state.loading = false;
        state.error = action.payload;
      })
       // Handle get all booking event
       .addCase(fetchAllbookings.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(fetchAllbookings.fulfilled, (state, action) => {
        state.loading = false;
        state.allbookings = action.payload || [];
      })
      .addCase(fetchAllbookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       // Handle deleting a booking
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Booking deleted successfully!";
        state.allbookings = state.allbookings.filter(
          (booking) => booking.bookingId !== action.meta.arg
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete the booking.";
      })
      .addCase(fetchAlleventSessions.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(fetchAlleventSessions.fulfilled, (state, action) => {
        state.loading = false;
        state.eventSessions = action.payload || [];
      })
      .addCase(fetchAlleventSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedEvent, clearMessages } = bookinEventgSlice.actions;
export default bookinEventgSlice.reducer;
