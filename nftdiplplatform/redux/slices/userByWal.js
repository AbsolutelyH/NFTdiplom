import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchUserByWal = createAsyncThunk('auth/fetchUserByWal', async(params) => {
    const {data} = await axios.get('/api/v1/users/getUserByWallet', params);
    return data;
});


const initialState = {
    data: null,
    status: 'loading',
};

const userByWalSlice = createSlice({
    name: 'userByWal',
    initialState,
    reducers:{},
    extraReducers: {
        [fetchUserByWal.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchUserByWal.fulfilled]: (state, action) => {
            state.status = 'loading';
            state.data = action.payload;
        },
        [fetchUserByWal.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    },
});


export const userByWalReducer = userByWalSlice.reducer;
