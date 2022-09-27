import React from "react";
import BookedFlightCard from "./BookedFlightCard";
import {nanoid} from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { closeBookedFlights, setClosingTime} from "../redux/slices/bookedSlice";

function BookedFlights() {
    const dispatch = useDispatch();


    const {closingTime, bookedFlights} = useSelector((state) => state.bookedFlights)

    function getIndividualFlights() {
        let flights = []
        bookedFlights.forEach((collection) =>{
            flights = [...flights, ...collection.bookings]
        })
        return flights;
    }

    React.useEffect(() => {
        function closeAfterDelay() {
            setTimeout(() => {
                dispatch(closeBookedFlights())
            }, 500)
        }

        if(closingTime === true) {
            closeAfterDelay();
        }
    }, [closingTime])

    let bookedFLightsToShow = getIndividualFlights(bookedFlights)
    let bookedFlightCard = bookedFLightsToShow.map((booking) => {
        return (
            <BookedFlightCard key={nanoid()} booking={booking} />
        )
    })

    return (
        <div className="booked-flights-outer-container" onClick={() => dispatch(setClosingTime())} >
            <div className={`booked-flights-inner-container ${closingTime ? "booking-closed" : "booking-open"}`} onClick={(e) => e.stopPropagation()}>
                <div className="close-booked-flights" onClick={() => dispatch(setClosingTime())}>
                    X
                </div>
                {bookedFlightCard}
            </div>
        </div>
    )
}

export default BookedFlights;