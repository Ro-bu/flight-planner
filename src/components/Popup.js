import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { setPopupText } from "../redux/slices/popupSlice";


function Popup() {

    const {popupType, popupText} = useSelector((state) => state.popup)

    const dispatch = useDispatch();
    
    React.useEffect(() => {
        if(popupType === "search") {
            dispatch(setPopupText("Please enter valid search parameters"))
        } else if (popupType === "booking") {
            dispatch(setPopupText("Please enter full name to book"))
        } else if (popupType === "expired") {
            dispatch(setPopupText("Pricelist expired"))
        } else if (popupType === "booked") {
            dispatch(setPopupText("Flight booked"))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popupType])

    return(
        <div className="popup-container">
            <p className="popup-text">{popupText}</p>
        </div>
    )
}

export default Popup;