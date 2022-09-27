import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { applyHideFilter, applyFilterActive, setCompanies } from "../redux/slices/filterSlice";


function Filter() {

    const {companies} = useSelector((state) => state.filter)
    const {flightsToShow} = useSelector((state) => state.flights)

    const dispatch = useDispatch();

    React.useEffect(() => {
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
            dispatch(setCompanies([...companyOptions]))
        }

        getCompanies(flightsToShow)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flightsToShow])


    return (
        <div className="filter-container">
            <div className="filter-block">
                <p className="filter-title">Company</p>
                <div className="filter-dropdown-container">
                    <Select options={companies} placeholder={"Company"} onChange={(e) => dispatch(applyFilterActive({company: e.value}))}/>
                </div>
            </div>
            <div className="filter-border"></div>
            <div className="filter-block" onClick={() => dispatch(applyFilterActive("price"))}>
                <p className="filter-title">Price</p>
            </div>
            <div className="filter-border"></div>

            <div className="filter-block" onClick={() => dispatch(applyFilterActive("time"))}>
                <p className="filter-title">Travel time</p>
            </div>
            <div className="filter-border"></div>
            <div className="filter-block" onClick={() => dispatch(applyFilterActive("distance"))}>
                <p className="filter-title">Distance</p>
            </div>
            <div className="filter-close" onClick={() => dispatch(applyHideFilter())}>
                <p className="filter-close-text">Close</p>
            </div>
        </div>
    )
}

export default Filter;