import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    const {data} = await axios.get('/api/v1/users');
    return data;
});

const initialState = {
    users: {
        items: [], 
        status: 'loading',
    }

};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.users.status = 'loading';
            state.users.items = [];
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.users.status = 'loaded';
            state.users.items = action.payload;
        },
        [fetchUsers.rejected]: (state) => {
            state.users.status = 'error';
            state.users.items = [];
        },
    },
});

export const usersReducer = usersSlice.reducer;