import {configureStore} from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import popupReducer from "./slices/popupSlice";
import bookedFlightsReducer from "./slices/bookedSlice";
import flightsReducer from "./slices/flightsSlice";

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        popup: popupReducer,
        bookedFlights: bookedFlightsReducer,
        flights: flightsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
      })
})