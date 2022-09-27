import React from "react";
import FlightCard from "./FlightCard";
import {nanoid} from "nanoid";
import { useSelector } from "react-redux";


function Flights(props) {

    const {filterActive} = useSelector((state) => state.filter)
    const {flightsToShow} = useSelector((state) => state.flights)

    let [flights, setFlights] = React.useState([])




    React.useEffect(() => {
        function flightsToComponents(flights) {
            let flightComponents = flights.map((flight) => {
                return(
                    <FlightCard bookFlight={props.bookFlight} flightInfo={flight} key={nanoid()} />
                    )
                })
            return flightComponents;
        }

        function filterAndRender(filter) {

            if(filter === "none"){
                setFlights([...flightsToComponents(flightsToShow)])
            } else if (filter === "distance") {
                let flightsByDistance = [...flightsToShow]
                flightsByDistance.sort((a,b) => {
                    return a.distance - b.distance
                })
                setFlights([...flightsToComponents(flightsByDistance)])
            } else if (filter === "time") {
                let flightsByTime = [...flightsToShow]
                flightsByTime.sort((a,b) => {
                    return a.time - b.time
                })
                setFlights([...flightsToComponents(flightsByTime)])
            } else if (filter === "price") {
                let flightsByPrice = [...flightsToShow]
                flightsByPrice.sort((a,b) => {
                    return a.price - b.price
                })
                setFlights([...flightsToComponents(flightsByPrice)])
            } else if (typeof filter === "object") {
                let flightsByCompany = []
                let companyStringified = JSON.stringify([filter.company])
                flightsToShow.forEach((collection) => {
                    let collectionCompanies = JSON.stringify([...new Set(collection.companies)])
                    if(companyStringified === collectionCompanies) {
                        flightsByCompany.push(collection)
                    }
                })
                setFlights([...flightsToComponents(flightsByCompany)])
            }
        }

        filterAndRender(filterActive)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterActive, flightsToShow])

    return(
        <div className="flights-container">
            {flights}
        </div>
    )
}

export default Flights;