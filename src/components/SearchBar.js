import React from "react";
import Select from "react-select";

const planets = [
    {value: "Neptune", label: "Neptune", isDisabled: false},
    {value: "Uranus", label: "Uranus", isDisabled: false},
    {value: "Saturn", label: "Saturn", isDisabled: false},
    {value: "Jupiter", label: "Jupiter", isDisabled: false},
    {value: "Mars", label: "Mars", isDisabled: false},
    {value: "Earth", label: "Earth", isDisabled: false},
    {value: "Venus", label: "Venus", isDisabled: false},
    {value: "Mercury", label: "Mercury", isDisabled: false}
]

function SearchBar(props) {

    const [searchedPlanets, setSearchedPlanets] = React.useState({to: "", from: ""})

    function fromPlanet(obj) {
        let newValue
        if(!obj){
            newValue = ""
        } else {
            newValue = obj.value
        }
        setSearchedPlanets((prev) => {
            return(
            {...prev,
                from: newValue
            }
            )
        })
    }

    function toPlanet(obj) {
        let newValue
        if(!obj){
            newValue = ""
        } else {
            newValue = obj.value
        }
        setSearchedPlanets((prev) => {
            return(
            {...prev,
                to: newValue
            }
            )
        })
    }

    return (
        <div className="search-bar-container">
            <div className="search-bar-dropdown-container">
                <Select options={planets} placeholder={"Planet"} onChange={(e) => {
                    fromPlanet(e)
                }} />
                <p className="search-to">TO</p>
                <Select options={planets} placeholder={"Planet"} onChange={(e) => {
                    toPlanet(e)
                }} />
            </div>
            <button type="button" onClick={(e) => props.search(searchedPlanets)} className="search-button">Search</button>
        </div>
    )
}

export default SearchBar;