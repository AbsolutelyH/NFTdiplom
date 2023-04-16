import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { signNFTReducer } from "./slices/signNFT";
import { userByWalReducer } from "./slices/userByWal";
import { usersReducer } from "./slices/users";
import { collectionsReducer } from "./slices/collections";
import { newCollectionReducer } from "./slices/newCollection";
import { singleNFTReducer } from "./slices/singleNFT";

const store = configureStore({
    reducer: {
        auth: authReducer,
        signNFT: signNFTReducer,
        users: usersReducer,
        userByWal: userByWalReducer,
        collections: collectionsReducer,
        newCollection: newCollectionReducer,
        singleNFT: singleNFTReducer,
    },
});

export default store;