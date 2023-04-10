import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { signNFTReducer } from "./slices/signNFT";
import { userByWalReducer } from "./slices/userByWal";
import { usersReducer } from "./slices/users";
import { collectionsReducer } from "./slices/collections";

const store = configureStore({
    reducer: {
        auth: authReducer,
        signNFT: signNFTReducer,
        users: usersReducer,
        userByWal: userByWalReducer,
        collections: collectionsReducer,
    },
});

export default store;