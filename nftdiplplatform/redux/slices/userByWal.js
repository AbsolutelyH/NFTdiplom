import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    status: 'loading',
};

const userByWalSlice = createSlice({
    name: 'userByWal',
    initialState,
    reducers:{
        addUser(state, action){
            state.data = action.payload;
        },
    },
});

export const {addUser} = userByWalSlice.actions;

export const userByWalReducer = userByWalSlice.reducer;
