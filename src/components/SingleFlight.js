import React from "react";

function SingleFlight(props) {

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
    function formatDate(date) {
      return (
        [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes()),
          padTo2Digits(date.getSeconds()),
        ].join(':')
      );
    }

    return (
        <div className="single-flight-container">
            <div className="route-company-container">
                <p className="route-text">{props.startPlanet + " - " + props.finishPlanet}</p>
                <p className="company-text card-small">{props.company}</p>
            </div>
            <div className="date-block">
            <div className="start-finish-container">
                  <p className="card-small">Start:</p>
                </div>
                <p className="card-date">{formatDate(new Date(props.flightData.flightStart))}</p>
            </div>
            <div className="date-block">
                <div className="start-finish-container">
                  <p className="card-small">Finish:</p>
                </div>
                <p className="card-date">{formatDate(new Date(props.flightData.flightEnd))}</p>
            </div>
        </div>
    )
}

export default SingleFlight;