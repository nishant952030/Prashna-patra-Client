import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    openFeedback:false,
}
const feedbackSlice = createSlice({
    name: "feedback",
    initialState,
    reducers: {
        setFeedbackForm: (state, action) => {
            state.openFeedback=action.payload
        }
    }
})
export const { setFeedbackForm } = feedbackSlice.actions;
export default feedbackSlice.reducer