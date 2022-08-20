import React from "react";
import SingleFlight from "./SingleFlight";
import {nanoid} from "nanoid";

function FlightCard(props) {
    let singleFlights = props.flightInfo.flights.map((flight) => {
        let flightIndex = props.flightInfo.flights.indexOf(flight)
        return (
            <SingleFlight
                key={nanoid()}
                company={props.flightInfo.companies[flightIndex]}
                startPlanet={props.flightInfo.route[flightIndex]}
                finishPlanet={props.flightInfo.route[flightIndex+1]}
                flightData={flight}
            />
        )
    });

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

    const [inputActive, setInputActive] = React.useState(false);
    const [name, setName] = React.useState({first: "", last: ""})

    function toggleInput() {
        if(!inputActive){
            setInputActive(prev => !prev)
        } else {
            props.bookFlight(name.first, name.last, props.flightInfo)
        }
    }

    function nameToState(firstOrLast, name) {
        setName((prev) => {
            return(
                {...prev,
                [firstOrLast]: name}
            )
        })
    }

    return(
        <div className="flight-card">
            <div className="flight-card-flights">
                {singleFlights}
            </div>
            <div className="card-info-block">
                <div className="info-top-row">
                    <div className="card-info-row">
                        <p className="info-text-small">Distance:</p>
                        <p className="info-text-big">{props.flightInfo.distance + " km"}</p>
                    </div>
                    <div className="card-info-row">
                        <p className="info-text-small">Time:</p>
                        <p className="info-text-big">{dhm(props.flightInfo.time)}</p>
                    </div>
                </div>
                <div className="card-info-row price-row">
                    <p className="info-text-small price-small">Price:</p>
                    <p className="info-text-big price-big">{"$" + props.flightInfo.price}</p>
                </div>
                <div className="book-flight-container">
                    {inputActive &&
                    <div className={inputActive ? "book-flight-form-container" : "book-flight-form-container form-hidden"}>
                        <div className="input-container">
                            <label htmlFor="first-name">First name:</label>
                            <input type="text" name="first-name" id="first-name" onChange={(e) => nameToState("first", e.target.value)}></input>
                        </div>
                        <div className="input-container">
                            <label htmlFor="last-name">Last name:</label>
                            <input type="text" name="last-name" id="last-name" onChange={(e) => nameToState("last", e.target.value)}></input>
                        </div>
                    </div>
                    }
                    <div className="book-flight-button" onClick={toggleInput}>
                        Book flight
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlightCard;