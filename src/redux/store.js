import {configureStore} from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import popupReducer from "./slices/popupSlice";

export const store = configureStore({
    reducer: {
        filter: filterReducer,
        popup: popupReducer
    }
})