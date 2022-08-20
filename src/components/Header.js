import React from "react";

function Header(props) {

    return(
        <div className="header">
            <h1 className="header-title">COSMOS ODYSSEY</h1>
            <button onClick={props.openBookedFlights} type="button" className="header-button">YOUR BOOKED FLIGHTS</button>
        </div>
    )
}

export default Header;