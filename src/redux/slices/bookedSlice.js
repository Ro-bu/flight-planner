import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookedFLightsOpen: false,
    bookedFlights: []
}

const bookedSlice = createSlice({
    name: "bookedFlights",
    initialState,
    reducers: {
        closeBookedFlights: (state) => {
            state.bookedFlightsOpen = false;
        },
        openBookedFlights: (state) => {
            state.bookedFlightsOpen = true;
        },
        setBookedFlights: (state, action) => {
            state.bookedFlights = action.payload;
        }
    }
})

export default bookedSlice.reducer;

export const {closeBookedFlights, openBookedFlights, setBookedFlights} = bookedSlice.actions;