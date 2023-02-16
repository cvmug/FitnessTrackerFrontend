import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "./Header";

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("searchTerm");

    const fetchActivities = async () => {
        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/activities`);
            const result = await response.json();
            if (result.error) throw result.error;
            setActivities(result);
        } catch (error) {
            console.log("Cannot Load Activities". error);
        };
    };

    useEffect(fetchActivities, []);

    const searchActivities = (activity, text) => {
        text = text.toLowerCase();
        const {name, description} = activity;
        for (const field of [name, description]) {
            if(field.toLowerCase().includes(text)) {
                return true;
            }
        }
    }

    const filteredActivities = searchTerm ? activities.filter(activity => searchActivities(activity, searchTerm)) : activities;

    return <>
                <Header />
        <h1> Activities </h1>
            <div>
                <input className="searchbar" type="text" name="search" placeholder="Find Activities" value={searchTerm || ""} onChange={(event) => {
                    setSearchParams({searchTerm:event.target.value})
                }}/>
                <Link to="/AddActivities"> Create a New Activity </Link>
            </div>
            <div>
                { filteredActivities && filteredActivities.length ?
                    filteredActivities.map((activity, id) => {
                        return (
                            <div key={id}>
                                <div>
                                    <span><b> Activity: </b><br /><br />{(activity.name).toUpperCase()}<br /></span>
                                    <br />
                                    <span><b> Description: </b><br /><span>{activity.description}</span></span>
                                </div>
                            </div>
                        )
                    })
                    : null
                }
            </div>
    </>
}

export default Activities;