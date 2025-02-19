import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token:  null,
    isLoggedIn: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
           
        },
        setIsLoggedIn: (state, action)=>{
           state.isLoggedIn=action.payload  
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn=false
        },
    },
});

export const { setUser, logout,setToken,setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
