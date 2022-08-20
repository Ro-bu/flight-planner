import React from "react";

function Popup(props) {
    const [popupText, setPopupText] = React.useState()

    React.useEffect(() => {
        if(props.errorType === "search") {
            setPopupText("Please enter valid search parameters")
        } else if (props.errorType === "booking") {
            setPopupText("Please enter full name to book")
        } else if (props.errorType === "expired") {
            setPopupText("Pricelist expired")
        } else if (props.errorType === "booked") {
            setPopupText("Flight booked")
        }
    }, [props.errorType])

    return(
        <div className="popup-container">
            <p className="popup-text">{popupText}</p>
        </div>
    )
}

export default Popup;