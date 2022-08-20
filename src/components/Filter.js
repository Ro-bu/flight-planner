import React from "react";
import Select from "react-select";


function Filter(props) {

    const [companies, setCompanies] = React.useState([])

    function getCompanies (flightCollection) {
        let companyStrings = new Set()
        flightCollection.forEach((collection) => {
            collection.companies.forEach((company) => {
                companyStrings.add(company)
            })
        })
        let companyOptions = [];
        companyStrings.forEach((company) => {
            companyOptions.push({value: company, label: company})
        })


        setCompanies([...companyOptions])
    }
    React.useEffect(() => {
        getCompanies(props.flightsToShow)
    }, [props.flightsToShow])


    return (
        <div className="filter-container">
            <div className="filter-block">
                <p className="filter-title">Company</p>
                <div className="filter-dropdown-container">
                    <Select options={companies} placeholder={"Company"} onChange={(e) => props.applyFilter({company: e.value})}/>
                </div>
            </div>
            <div className="filter-border"></div>
            <div className="filter-block" onClick={() => props.applyFilter("price")}>
                <p className="filter-title">Price</p>
            </div>
            <div className="filter-border"></div>

            <div className="filter-block" onClick={() => props.applyFilter("time")}>
                <p className="filter-title">Travel time</p>
            </div>
            <div className="filter-border"></div>
            <div className="filter-block" onClick={() => props.applyFilter("distance")}>
                <p className="filter-title">Distance</p>
            </div>
            <div className="filter-close" onClick={props.toggleFilter}>
                <p className="filter-close-text">Close</p>
            </div>
        </div>
    )
}

export default Filter;