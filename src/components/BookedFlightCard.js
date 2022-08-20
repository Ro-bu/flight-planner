import React from "react";

function BookedFlightCard(props) {
    function dhm(t){
        var cd = 24 * 60 * 60 * 1000,
            ch = 60 * 60 * 1000,
            d = Math.floor(t / cd),
            h = Math.floor( (t - d * cd) / ch),
            m = Math.round( (t - d * cd - h * ch) / 60000),
            pad = function(n){ return n < 10 ? '0' + n : n; };
      if( m === 60 ){
        h++;
        m = 0;
      }
      if( h === 24 ){
        d++;
        h = 0;
      }
      return `${d}d ${pad(h)}h ${pad(m)}m`;
    }

    return (
        <div className="booked-flight-card">
            <div className="booking-card-big-block">
                <div className="booking-card-small-block">
                    <p className="booking-small-text">Name:</p>
                    <p className="booking-big-text">{props.booking.firstName + " " + props.booking.lastName}</p>
                </div>
                <div className="booking-card-small-block">
                    <p className="booking-small-text">Route:</p>
                    <p className="booking-big-text">{props.booking.routes.join(", ")}</p>
                </div>
                <div className="booking-card-small-block">
                    <p className="booking-small-text">Companies:</p>
                    <p className="booking-big-text">{props.booking.companies.join(", ")}</p>
                </div>
            </div>
            <div className="booking-card-big-block">
                <div className="booking-card-small-block">
                    <p className="booking-small-text">Price:</p>
                    <p className="booking-big-text">{"$" + props.booking.price}</p>
                </div>
                <div className="booking-card-small-block">
                    <p className="booking-small-text">Time:</p>
                    <p className="booking-big-text">{dhm(props.booking.time)}</p>
                </div>
            </div>
        </div>
    )
}

export default BookedFlightCard;