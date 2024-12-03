import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllAdminCourses = createAsyncThunk(
    "adminCourses/fetchAllAdminCourses",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_URL_BACKEND}/api/Admin/get-all-courses`,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,     
            } }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response ? error.response.data : { message: "An error occurred" }
            );
        }
    }
);

const adminCourseSlice = createSlice({
    name: "adminCourses",
    initialState: {
        adminCourses: [],
        selectedCourse: null,
        loading: false,
        error: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAdminCourses.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchAllAdminCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.adminCourses = action.payload;
            })
            .addCase(fetchAllAdminCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch courses.";
            });
    },
});

export default adminCourseSlice.reducer;
