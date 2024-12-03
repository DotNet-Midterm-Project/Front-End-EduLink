import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfileImage = createAsyncThunk(
  "profile/fetchProfileImage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/Common/Get-ProfileImage`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        }
      );
      console.log("this is the response", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: "An error occurred" }
      );
    }
  }
);

const ImageProfileSlice = createSlice({
  name: "profile",
  initialState: {
    profileImage: {},
    loading: false,
    message: null,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileImage.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.profileImage = action.payload || {};
      })
      .addCase(fetchProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default ImageProfileSlice.reducer;
