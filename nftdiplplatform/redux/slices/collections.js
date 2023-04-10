import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchCollections = createAsyncThunk('collections/fetchCollections', async() => {
    const {data} = await axios.get('/api/v1/collections/AllCollections');
    return data;
});

export const fetchMyCollections = createAsyncThunk('collections/fetchMyCollections', async(params) => {
    const {data} = await axios.post('/api/v1/collections/MyCollections', params);
    return data;
});

const initialState = {
    collections: {
        items: [], 
        status: 'loading',
    }

};

const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers:{},
    extraReducers: {
        [fetchCollections.pending]: (state) => {
            state.collections.status = 'loading';
            state.collections.items = [];
        },
        [fetchCollections.fulfilled]: (state, action) => {
            state.collections.status = 'loaded';
            state.collections.items = action.payload;
        },
        [fetchCollections.rejected]: (state) => {
            state.collections.status = 'error';
            state.collections.items = [];
        },
        [fetchMyCollections.pending]: (state) => {
            state.collections.status = 'loading';
            state.collections.items = [];
        },
        [fetchMyCollections.fulfilled]: (state, action) => {
            state.collections.status = 'loaded';
            state.collections.items = action.payload;
        },
        [fetchMyCollections.rejected]: (state) => {
            state.collections.status = 'error';
            state.collections.items = [];
        },
    },
});

export const collectionsReducer = collectionsSlice.reducer;