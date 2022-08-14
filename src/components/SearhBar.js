import React from "react";


function SearchBar() {

    return (
        <div className="search-bar-container">
            <select className="search-dropdown" id="from" name="from">
                <option value="" disabled selected hidden>From</option>
                <option value="neptune">Neptune</option>
                <option value="uranus">Uranus</option>
                <option value="saturn">Saturn</option>
                <option value="jupiter">Jupiter</option>
                <option value="mars">Mars</option>
                <option value="earth">Earth</option>
                <option value="venus">Venus</option>
                <option value="mercury">Mercury</option>
            </select>

            <select className="search-dropdown" id="to" name="to">
                <option value="" disabled selected hidden>To</option>
                <option value="neptune">Neptune</option>
                <option value="uranus">Uranus</option>
                <option value="saturn">Saturn</option>
                <option value="jupiter">Jupiter</option>
                <option value="mars">Mars</option>
                <option value="earth">Earth</option>
                <option value="venus">Venus</option>
                <option value="mercury">Mercury</option>
            </select>
            <button type="button" className="search-button">Search</button>
        </div>
    )
}

export default SearchBar;