import { Dispatch, useState } from "react";
import markerCardInfo from "src/interfaces/markerCardInfo";
import LocationCard from "./LocationCard";
import LocationForm from "./LocationForm";
import '../styles/locations.css';

export default function Locations({locations, setLocations, setActiveLocation}: {
    locations: markerCardInfo[] | any,
    setLocations: Dispatch<markerCardInfo[] | any>,
    setActiveLocation: Dispatch<markerCardInfo[] | any>}) {
    let [addLocationForm, setAddLocationForm] = useState<boolean>(false);

    return(
        <div className="locations" id="locations-wrapper">
            {locations.map((location: markerCardInfo, i: number)=>{
                return <LocationCard
                    location={location} 
                    key={i} 
                    setActiveLocation={setActiveLocation}/>
            })}
            {!addLocationForm && 
                <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded "  
                    onClick={()=>{setAddLocationForm(true)}}>Add Location</button>
            }
            
            {addLocationForm && 
                <LocationForm setLocations={setLocations} setShowForm={setAddLocationForm} locations={locations}/>
                }
        </div>
    );
}