import {configureStore} from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import popupReducer from "./slices/popupSlice";
import bookedFlightsReducer from "./slices/bookedSlice";

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        popup: popupReducer,
        bookedFlights: bookedFlightsReducer
    }
})