import React from "react";
import { useDispatch } from "react-redux";
import { openBookedFlights} from "../redux/slices/bookedSlice";


function Header() {
    const dispatch = useDispatch();


    return(
        <div className="header">
            <h1 className="header-title">COSMOS ODYSSEY</h1>
            <button onClick={() => dispatch(openBookedFlights())} type="button" className="header-button">YOUR BOOKED FLIGHTS</button>
        </div>
    )
}

export default Header;