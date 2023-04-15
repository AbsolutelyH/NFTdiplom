import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchPostNFT = createAsyncThunk('singleNFT/fetchPostNFT', async(params) => {
    const {data} = await axios.post('/api/v1/nfts', params);
    return data;
});


const initialState = {
    data: null,
    status: 'loading',
};

const postNftSlice = createSlice({
    name: 'singleNFT',
    initialState,
    reducers:{
    },
    extraReducers: {
        [fetchPostNFT.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchPostNFT.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchPostNFT.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    },
});

export const singleNFTReducer = postNftSlice.reducer;