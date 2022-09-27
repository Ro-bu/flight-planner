import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookedFLightsOpen: false,
    bookedFlights: [],
    closingTime: false
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
            state.closingTime = false;
        },
        setBookedFlights: (state, action) => {
            state.bookedFlights = action.payload;
        },
        setClosingTime: (state) => {
            state.closingTime = true;
        }
    }
})

export default bookedSlice.reducer;

export const {setClosingTime, closeBookedFlights, openBookedFlights, setBookedFlights} = bookedSlice.actions;