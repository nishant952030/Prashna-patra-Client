import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import questions from "./questionSlice.js"
import unauth from "./unauth"
const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    auth: authReducer,
    questions: questions,
    unAuth:unauth
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
