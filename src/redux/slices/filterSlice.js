import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showFilter: false,
    filterActive: "none"
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        applyShowFilter: (state) => {
            state.showFilter = true;
        },
        applyHideFilter: (state) => {
            state.showFilter = false;
        },
        applyFilterActive: (state, action) => {
            state.filterActive = action.payload;
        }
    }
})

export default filterSlice.reducer;

export const { applyShowFilter, applyHideFilter, applyFilterActive } = filterSlice.actions;