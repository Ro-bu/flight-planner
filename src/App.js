import React from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Flights from "./components/Flights";
import {getPossibleRoutes, possibleRoutes} from "./components/PathFinder";
import Popup from "./components/Popup";
import Storage from "./components/Storage";
import BookedFlights from "./components/BookedFlights";
import { useDispatch, useSelector } from "react-redux";
import { applyShowFilter } from "./redux/slices/filterSlice";
import { setPopupType } from "./redux/slices/popupSlice";
import {setBookedFlights } from "./redux/slices/bookedSlice";
import {setHasBeenSearched, setFlightData, setFlightRoutes, setIsLoading, setFlightsToShow} from "./redux/slices/flightsSlice";


function App() {

  const {hasBeenSearched, isLoading, flightData} = useSelector((state) => state.flights)
  const {showFilter } = useSelector((state) => state.filter);
  const {popupType} = useSelector((state) => state.popup);
  const {bookedFlightsOpen } = useSelector((state) => state.bookedFlights)

  const dispatch = useDispatch();

  React.useEffect(() => {
    function checkShowFilter() {
      if(window.innerWidth > 999) {
        dispatch(applyShowFilter())
      }
    }
    window.addEventListener("resize", checkShowFilter)
    return () => window.removeEventListener("resize", checkShowFilter)
  })

  React.useEffect(() => {
    dispatch(setBookedFlights(Storage.getData()))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getNamedRoutes(routes){
    let namedRoutes = []
    routes.forEach((route) => {
      let currentRoute = [];
      route.forEach((planetIndex) => {
        currentRoute.push(possibleRoutes[planetIndex].planet)
      })
      namedRoutes.push(currentRoute);
    })
    return namedRoutes;
  }

  function search(planets) {
    if(planets.from === planets.to || planets.from === "" || planets.to === "") {
      dispatch(setPopupType("search"))
      setTimeout(() => {
        (dispatch(setPopupType("")))
      }, 5000)
    } else {
      const IndexflightRoutes = getPossibleRoutes(planets.from, planets.to);
      const namedRoutes = getNamedRoutes(IndexflightRoutes);
      dispatch(setFlightRoutes(namedRoutes))
      fetchAndRender(namedRoutes)
    }
  }

  function fetchAndRender(routes) {
    fetch("api/v1.0/TravelPrices")
    .then(res => res.json())
    .then(data => {
      dispatch(setFlightData(data))
      dispatch(setHasBeenSearched(true))
      let flightsToFilter = getSuitableFlights(data, routes);
      let flightDistances = getFlightDistances(data);
      dispatch(setFlightsToShow(sortFlightsAndRoutes(routes, flightsToFilter, flightDistances)));
      dispatch(setIsLoading(false))
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function getFlightDistances(data) {
    let flightDistances = []
    data.legs.forEach((leg) => {
      let singleFlightDistance = {
        from: leg.routeInfo.from.name,
        to: leg.routeInfo.to.name,
        distance: leg.routeInfo.distance
      }
      flightDistances.push(singleFlightDistance);
    })
    return flightDistances;
  }

  function getRouteDistance(route, flightDistances) {
    let totalDistance = 0;
    for(let i = 0; i < route.length-1; i++) {
      let singleFlightDistance = 0;
      flightDistances.forEach((flight) => {
        if(route[i] === flight.from && route[i+1] === flight.to) {
          singleFlightDistance += flight.distance
        }
      })
      totalDistance += singleFlightDistance;
    }
    return totalDistance;
  };

  function sortFlightsAndRoutes(routes, flights, flightDistances) {
    let sortedFlights = [];
    for(let i=0; i<routes.length; i++) {
      if(flights[i].length > 0 && routes[i].length-1 === flights[i][0].length) {
        let routeLength = getRouteDistance(routes[i], flightDistances)
        flights[i].forEach((flightCollection) => {
          let companies = flightCollectionCompanies(flightCollection);
          let time = flightCollectionTotalTime(flightCollection);
          let price = flightCollectionPrice(flightCollection)
          let flightPlusRoute = {route: [...routes[i]],
                                  flights: [...flightCollection],
                                  distance: routeLength,
                                  companies: [...companies],
                                  time: time,
                                  price: price
          }
          sortedFlights.push(flightPlusRoute)
        })
      }

    }
    return sortedFlights;
  }

  function flightCollectionPrice(collection) {
    let price = 0;
    collection.forEach((flight) => {
      price += flight.price;
    })
    return Math.floor(price*100)/100;
  }

  function flightCollectionCompanies(collection) {
    let companies = [];
    collection.forEach((flight) => {
      companies = [...companies, flight.company.name]
    })
    return companies;
  }
  function flightCollectionTotalTime(collection) {
    let time =new Date(collection[collection.length-1].flightEnd) - new Date(collection[0].flightStart)
    return time;
  };

  function getSuitableFlights(data, routes) {
    let flightsArray = []
    routes.forEach((route) => {
      let currentArray = []
      for(let i = 0; i < route.length-1; i++){
        if(currentArray.length === 0) {
          let tempArray = [];
          data.legs.forEach((leg) => {
            if(leg.routeInfo.from.name === route[i] && leg.routeInfo.to.name === route[i+1]){
              leg.providers.forEach((provider) => {
                tempArray.push([provider]);
              })
            }
          })
          currentArray = [...tempArray]
        } else {
          let tempArray = []
          currentArray.forEach((provider) => {
            data.legs.forEach((leg) => {
              if(leg.routeInfo.from.name === route[i] && leg.routeInfo.to.name === route[i+1]){
                leg.providers.forEach((nextProvider) => {
                  let prevFlightEnd
                  if(provider.length === 1){
                    prevFlightEnd = new Date(provider[provider.length-1].flightEnd)
                  } else {
                    prevFlightEnd = new Date(provider[provider.length-1].flightEnd)
                  }
                  let newFlightStart = new Date(nextProvider.flightStart)
                  if(prevFlightEnd < newFlightStart){
                    tempArray.push([...provider, nextProvider])
                  }
                })
              }
            })
          })
          currentArray = [...tempArray]
        }
      }
      flightsArray.push(currentArray)
    })
    return flightsArray;
  }

  function bookFlight(firstName, lastName, flight) {
    let bookingData
    if(firstName === "" || lastName === "") {
      dispatch(setPopupType("booking"))
      setTimeout(() => {
        dispatch(setPopupType(""))
      }, 5000)
      return;
    } if (new Date(flightData.validUntil) < new Date()) {
      dispatch(setPopupType("expired"))
      setTimeout(() => {
        dispatch(setPopupType(""))
      }, 5000)
      return;
    } else {
      bookingData = {
        firstName: firstName,
        lastName: lastName,
        routes: flight.route,
        companies: [...flight.companies],
        price: flight.price,
        time: flight.time
      }
      bookedFlightToStorage(bookingData)
      dispatch(setPopupType("booked"))
      setTimeout(() => {
        dispatch(setPopupType(""))
      }, 5000)
    }
    
  }

  function bookedFlightToStorage(booking) {
    let priceListStored = false
    let currentData = Storage.getData()
    currentData.forEach((dataObj) => {
      if(dataObj.priceList.id === flightData.id) {
        priceListStored = true;
        dataObj.bookings = [...dataObj.bookings, booking]
      }
    })
    if(!priceListStored) {
      currentData = [{priceList: flightData, bookings: [booking]}, ...currentData]
    }
    Storage.saveData(currentData)
    Storage.checkLength()
    dispatch(setBookedFlights(Storage.getData()))
  }


  return (
    <div className="main-container">
      {popupType !== "" &&
        <Popup />
      }
      <Header />
      {bookedFlightsOpen &&
        <BookedFlights />
      }
      {!hasBeenSearched &&
      <h2 className="starting-title">
        Choose your next flight
      </h2>}
      <SearchBar search={search} />
      {hasBeenSearched &&
        <div className="filter-main">
          {showFilter ? <Filter /> :
            <div className="filter-block bottom-border" onClick={() => dispatch(applyShowFilter())}>
              <p className="filter-title">Filter</p>
            </div>}
        </div>
      }
      { !isLoading && 
      <Flights bookFlight={bookFlight} />
      }
    </div>
  );
}

export {App};
