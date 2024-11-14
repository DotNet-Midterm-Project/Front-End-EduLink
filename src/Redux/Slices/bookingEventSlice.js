import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllEvent = createAsyncThunk(
    'event/fetchAllEvent',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/Common/get-all-Workshops`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : { message: "An error occurred" })
        }
    }
);

const bookinEventgSlice = createSlice({
    name: "events",
    initialState: {
        events: [],
        selectedEvent: null,
        loading: false,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllEvent.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchAllEvent.fulfilled, (state, action) => {
            state.loading = false;
            state.events = action.payload.workshops;
        })
        .addCase(fetchAllEvent.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export default bookinEventgSlice.reducer;