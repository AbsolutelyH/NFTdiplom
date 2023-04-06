import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchSignNFT = createAsyncThunk('signNFT/fetchSignNFT', async() => {
    const {data} = await axios.get('/api/v1/users/getAuthNFT');
    return data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const signNFTSlice = createSlice({
    name: 'signNFT',
    initialState,
    reducer:{},
    extraReducers: {
        [fetchSignNFT.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchSignNFT.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchSignNFT.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    },
});


export const signNFTReducer = signNFTSlice.reducer;
