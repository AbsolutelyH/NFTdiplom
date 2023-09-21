import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchMyNFTs = createAsyncThunk('allNFTs/fetchMyNFTs', async(params) => {
    const {data} = await axios.post('/api/v1/nfts/MyNFTs', params);
    return data;
});

const initialState = {
    allNFTs: {
        items: [], 
        status: 'loading',
    }

};

const allNFTsSlice = createSlice({
    name: 'allNFTs',
    initialState,
    reducers:{},
    extraReducers: {
        [fetchMyNFTs.pending]: (state) => {
            state.allNFTs.status = 'loading';
            state.allNFTs.items = [];
        },
        [fetchMyNFTs.fulfilled]: (state, action) => {
            state.allNFTs.status = 'loaded';
            state.allNFTs.items = action.payload;
        },
        [fetchMyNFTs.rejected]: (state) => {
            state.allNFTs.status = 'error';
            state.allNFTs.items = [];
        },
    },
});

export const allNFTsReducer = allNFTsSlice.reducer;