import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchNewCollection = createAsyncThunk('newCollection/fetchNewCollection', async(params) => {
    const {data} = await axios.post('/api/v1/collections/', params);
    return data;
});

export const fetchUpdateCollection = createAsyncThunk('newCollection/fetchUpdateCollection', async(params) => {
    const {data} = await axios.patch('/api/v1/collections/UpdateCollection', params);
    return data;
});

export const fetchOneCollection = createAsyncThunk('newCollection/fetchOneCollection', async(params) => {
    const {data} = await axios.post('/api/v1/collections/OneCollection', params);
    return data;
});

const initialState = {
    newCollection: {
        data: null, 
        status: 'loading',
    }

};

const newCollectionSlice = createSlice({
    name: 'newCollection',
    initialState,
    reducers:{},
    extraReducers: {
        [fetchNewCollection.pending]: (state) => {
            state.newCollection.status = 'loading';
            state.newCollection.data = null;
        },
        [fetchNewCollection.fulfilled]: (state, action) => {
            state.newCollection.status = 'loaded';
            state.newCollection.data = action.payload;
        },
        [fetchNewCollection.rejected]: (state) => {
            state.newCollection.status = 'error';
            state.newCollection.data = null;
        },
        [fetchUpdateCollection.pending]: (state) => {
            state.newCollection.status = 'loading';
            state.newCollection.data = null;
        },
        [fetchUpdateCollection.fulfilled]: (state, action) => {
            state.newCollection.status = 'loaded';
            state.newCollection.data = action.payload;
        },
        [fetchUpdateCollection.rejected]: (state) => {
            state.newCollection.status = 'error';
            state.newCollection.data = null;
        },
        [fetchOneCollection.pending]: (state) => {
            state.newCollection.status = 'loading';
            state.newCollection.data = null;
        },
        [fetchOneCollection.fulfilled]: (state, action) => {
            state.newCollection.status = 'loaded';
            state.newCollection.data = action.payload;
        },
        [fetchOneCollection.rejected]: (state) => {
            state.newCollection.status = 'error';
            state.newCollection.data = null;
        },
    },
});

export const newCollectionReducer = newCollectionSlice.reducer;