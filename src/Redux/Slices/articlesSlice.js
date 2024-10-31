import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllArticles = createAsyncThunk(
    'articles/fetchAllArticles',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/Common/get-all-articles`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : { message: "An error occurred" })
        }
    }
);

export const fetchArticleById = createAsyncThunk(
    'articles/fetchArticleById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/Common/ArticleById/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : { message: "An error occurred" });
        }
    }
);

const articlesSlice = createSlice({
    name: "articles",
    initialState: {
        articles: [],
        selectedArticle: null,
        loading: false,
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllArticles.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchAllArticles.fulfilled, (state, action) => {
            state.loading = false;
            state.articles = action.payload.articles;
        })
        .addCase(fetchAllArticles.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }).addCase(fetchArticleById.fulfilled, (state, action) => {
            state.selectedArticle = action.payload;
            state.loading = false;
        })
        .addCase(fetchArticleById.rejected, (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        });
    }
})

export default articlesSlice.reducer;