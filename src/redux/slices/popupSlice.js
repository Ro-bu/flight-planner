import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    popupType: "",
    popupText: ""
}

const popupSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
        setPopupType: (state, action) => {
            state.popupType = action.payload;
        },
        setPopupText: (state, action) => {
            state.popupText = action.payload;
        }
    }
})

export default popupSlice.reducer;

export const {setPopupType, setPopupText} = popupSlice.actions;