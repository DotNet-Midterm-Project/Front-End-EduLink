import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addLikeToArticle = createAsyncThunk(
  "like/addLikeToArticle",
  async (articleId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_URL_BACKEND
        }/api/CommentAndLike/add-like/${articleId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);

      return { articleId, ...response.data };
    } catch (error) {
      console.log(error);

      return rejectWithValue(
        error.response ? error.response.data : { message: error.message }
      );
    }
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState: {
    articles: [],
    loading: false,
    error: "",
  },
  reducers: {
    toggleLikeLocally: (state, action) => {
      const article = state.articles.find((a) => a.id === action.payload);
      if (article) {
        article.isLiked = !article.isLiked;
        article.likesCount += article.isLiked ? 1 : -1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLikeToArticle.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addLikeToArticle.fulfilled, (state, action) => {
        state.loading = false;
        const article = state.articles.find(
          (a) => a.id === action.payload.articleId
        );
        if (article) {
          article.isLiked = true; // Assuming like was added
          article.likesCount += 1; // Increase the count by 1
        }
      })
      .addCase(addLikeToArticle.rejected, (state, action) => {
        state.loading = false;
        const article = state.articles.find((a) => a.id === action.meta.arg);
        if (article) {
          article.isLiked = !article.isLiked; // Revert local state
          article.likesCount += article.isLiked ? 1 : -1; // Adjust count
        }
        state.error = action.payload.message || "An error occurred";
      });
  },
});

export const { toggleLikeLocally } = likeSlice.actions;
export default likeSlice.reducer;
