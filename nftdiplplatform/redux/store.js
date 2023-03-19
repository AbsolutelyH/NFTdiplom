import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { signNFTReducer } from "./slices/signNFT";

const store = configureStore({
    reducer: {
        auth: authReducer,
        signNFT: signNFTReducer,
    },
});

export default store;