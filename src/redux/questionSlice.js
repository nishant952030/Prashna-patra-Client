import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [],
    isTestOn: false,
    timeStartedAt: null,
    testDetails:null
}
const questionSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions=action.payload
        },
        setIsTestOn: (state, action) => {
            state.isTestOn = action.payload;
        },
        setTimeStartedAt: (state, action) => {
            state.timeStartedAt=action.payload
        },
        setTestDetails: (state, action) =>{
            state.testDetails=action.payload
        }
    }
})
export const { setQuestions,setIsTestOn,setTimeStartedAt,setTestDetails} = questionSlice.actions;
export default questionSlice.reducer;