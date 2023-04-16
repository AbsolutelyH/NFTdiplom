import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchNewCollection = createAsyncThunk('newCollection/fetchNewCollection', async(params) => {
    const {data} = await axios.post('/api/v1/collections/', params);
    return data;
});

export const fetchUpdateCollection = createAsyncThunk('newCollection/fetchUpdateCollection', async(params) => {
    const {data} = await axios.patch('/api/v1/collections/642db8eddfe9631168cf4b93', params);
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
            state.newCollection.items = null;
        },
        [fetchNewCollection.fulfilled]: (state, action) => {
            state.newCollection.status = 'loaded';
            state.newCollection.items = action.payload;
        },
        [fetchNewCollection.rejected]: (state) => {
            state.newCollection.status = 'error';
            state.newCollection.items = null;
        },
        [fetchUpdateCollection.pending]: (state) => {
            state.newCollection.status = 'loading';
            state.newCollection.items = null;
        },
        [fetchUpdateCollection.fulfilled]: (state, action) => {
            state.newCollection.status = 'loaded';
            state.newCollection.items = action.payload;
        },
        [fetchUpdateCollection.rejected]: (state) => {
            state.newCollection.status = 'error';
            state.newCollection.items = null;
        },
    },
});

export const newCollectionReducer = newCollectionSlice.reducer;