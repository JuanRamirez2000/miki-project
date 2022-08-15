import markerCardInfo from "src/interfaces/markerCardInfo"
import { Dispatch } from "react"

export default function LocationCard({location, setActiveLocation}: {
    location: markerCardInfo,
    setActiveLocation: Dispatch<markerCardInfo[] | any>
}){
    return(
        <div onMouseDown={()=>{setActiveLocation({
                lat: location.locationCoordinates?.lat,
                lng: location.locationCoordinates?.lng
            }
        )}}>
            <div className="rounded overflow-hidden shadow-lg">
                <p className="font-bold text-xl">{location.locationName}</p>
                <p className="text-grey-700 text-base">{location.locationDescription}</p>
            </div>
        </div>
    )
}