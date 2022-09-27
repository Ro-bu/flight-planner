import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showFilter: false,
    filterActive: "none",
    companies: []
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
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        }
    }
})

export default filterSlice.reducer;

export const { applyShowFilter, applyHideFilter, applyFilterActive, setCompanies } = filterSlice.actions;