import React from "react";
import BookedFlightCard from "./BookedFlightCard";
import {nanoid} from "nanoid";

function BookedFlights(props) {

    function getIndividualFlights(list) {
        let flights = []
        props.bookedFlights.forEach((collection) =>{
            flights = [...flights, ...collection.bookings]
        })
        return flights;
    }

    let bookedFLightsToShow = getIndividualFlights(props.bookedFlights)
    let bookedFlightCard = bookedFLightsToShow.map((booking) => {
        return (
            <BookedFlightCard key={nanoid()} booking={booking} />
        )
    })

    function close() {
        props.closeBookedFlights()
    }

    return (
        <div className="booked-flights-outer-container">
            <div className="booked-flights-inner-container booking-open">
                <div className="close-booked-flights" onClick={props.closeBookedFlights}>
                    X
                </div>
                {bookedFlightCard}
            </div>
        </div>
    )
}

export default BookedFlights;