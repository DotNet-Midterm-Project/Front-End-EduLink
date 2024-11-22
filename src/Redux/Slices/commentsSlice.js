import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ articleID, commentText }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_BACKEND}/api/CommentAndLike/add-comment`,
        { articleID, commentText },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error adding comment');
    }
  }
);

export const fetchCommentsByArticle = createAsyncThunk(
  'comments/fetchCommentsByArticle',
  async (articleId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/api/CommentAndLike/get-comments-by-article/${articleId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching comments');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_URL_BACKEND}/api/CommentAndLike/delete-comment/${commentId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      return commentId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error deleting comment');
    }
  }
);

// Slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch Comments
      .addCase(fetchCommentsByArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })

      // Delete Comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      });
  },
});

export default commentsSlice.reducer;
