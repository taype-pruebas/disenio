import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./states/user";

export const UserStore = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})

export default UserStore;