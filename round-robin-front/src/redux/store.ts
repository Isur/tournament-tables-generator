import { configureStore } from "@reduxjs/toolkit";
import tournamentsReducer from "./tournaments/slice";

const store = configureStore({
    reducer: {
        tournament: tournamentsReducer,
    },
})

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;