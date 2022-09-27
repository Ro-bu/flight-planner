import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hasBeenSearched: false,
    isLoading: true,
    flightData: {},
    flightRoutes: [],
    flightsToShow: []
}

const flightsSlice = createSlice({
    name: "flights",
    initialState,
    reducers:{
        setHasBeenSearched:(state) => {
            state.hasBeenSearched = true;
        },
        setFlightRoutes: (state, action) => {
            state.flightRoutes = action.payload;
        },
        setFlightsToShow: (state, action) => {
            state.flightsToShow = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setFlightData: (state, action) => {
            state.flightData = action.payload;
        }
    }
})

export default flightsSlice.reducer;

export const {setSuitableFlights, setFlightData, setHasBeenSearched, setFlightRoutes, setFlightsToShow, setIsLoading} = flightsSlice.actions;