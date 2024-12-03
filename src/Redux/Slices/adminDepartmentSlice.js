import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllDepartment = createAsyncThunk(
    'departments/fetchAllDepartment',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/Admin/get-all-departments?`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 
            } }
            );
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : { message: "An error occurred" })
        }
    }
);

const departmentSlice = createSlice({
    name: "departments",
    initialState: {
        departments: [],
        selectedCourse: null,
        loading: false,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllDepartment.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchAllDepartment.fulfilled, (state, action) => {
            state.loading = false;
            state.departments = action.payload;
        })
        .addCase(fetchAllDepartment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
     
    }
})
export default departmentSlice.reducer;