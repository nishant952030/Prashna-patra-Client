import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    modalOpen: false
}
const unAuthSlice = createSlice({
    name: "unauth",
    initialState,
    reducers: {
        setModalOpen: (state, action) => { 
            state.modalOpen=action.payload
        },
        
    }
})
export const { setModalOpen } = unAuthSlice.actions;
export default unAuthSlice.reducer;