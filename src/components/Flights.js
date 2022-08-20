import React from "react";
import FlightCard from "./FlightCard";
import {nanoid} from "nanoid";

function Flights(props) {

    let [flights, setFlights] = React.useState([])

    function flightsToComponents(flights) {
        let flightsToShow = flights.map((flight) => {
            return(
                <FlightCard bookFlight={props.bookFlight} flightInfo={flight} key={nanoid()} />
                )
            })
        return flightsToShow;
    }
    function filterAndRender(filter) {

        if(filter === "none"){
            setFlights([...flightsToComponents(props.flightsToShow)])
        } else if (filter === "distance") {
            let flightsByDistance = [...props.flightsToShow]
            flightsByDistance.sort((a,b) => {
                return a.distance - b.distance
            })
            setFlights([...flightsToComponents(flightsByDistance)])
        } else if (filter === "time") {
            let flightsByTime = [...props.flightsToShow]
            flightsByTime.sort((a,b) => {
                return a.time - b.time
            })
            setFlights([...flightsToComponents(flightsByTime)])
        } else if (filter === "price") {
            let flightsByPrice = [...props.flightsToShow]
            flightsByPrice.sort((a,b) => {
                return a.price - b.price
            })
            setFlights([...flightsToComponents(flightsByPrice)])
        } else if (typeof filter === "object") {
            let flightsByCompany = []
            let companyStringified = JSON.stringify([filter.company])
            props.flightsToShow.forEach((collection) => {
                let collectionCompanies = JSON.stringify([...new Set(collection.companies)])
                if(companyStringified === collectionCompanies) {
                    flightsByCompany.push(collection)
                }
            })
            setFlights([...flightsToComponents(flightsByCompany)])
        }
    }
    React.useEffect(() => {
        filterAndRender(props.filter)
    }, [props.filter, props.flightsToShow])

    return(
        <div className="flights-container">
            {flights}
        </div>
    )
}

export default Flights;