import React from "react";
import BookedFlightCard from "./BookedFlightCard";
import {nanoid} from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { closeBookedFlights} from "../redux/slices/bookedSlice";

function BookedFlights(props) {
    const dispatch = useDispatch();

    const {bookedFlights} = useSelector((state) => state.bookedFlights)

    function getIndividualFlights(list) {
        let flights = []
        bookedFlights.forEach((collection) =>{
            flights = [...flights, ...collection.bookings]
        })
        return flights;
    }

    let bookedFLightsToShow = getIndividualFlights(bookedFlights)
    let bookedFlightCard = bookedFLightsToShow.map((booking) => {
        return (
            <BookedFlightCard key={nanoid()} booking={booking} />
        )
    })

    return (
        <div className="booked-flights-outer-container">
            <div className="booked-flights-inner-container booking-open">
                <div className="close-booked-flights" onClick={() => dispatch(closeBookedFlights())}>
                    X
                </div>
                {bookedFlightCard}
            </div>
        </div>
    )
}

export default BookedFlights;