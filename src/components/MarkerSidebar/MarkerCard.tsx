import { Dispatch } from "react";
import markerCardInfo from "src/interfaces/markerCardInfo"

export default function MarkerCard({ marker, setActiveMarker, setEditMarkerID }: {
    marker: markerCardInfo,
    setActiveMarker: Dispatch<string>,
    setEditMarkerID: Dispatch<string>
}) {

    let updateActiveState = () => {
        setActiveMarker(marker.locationName as string);
    }

    let updateEditState = () => {
        setEditMarkerID(marker.locationName);
    }

    return (
        <div onMouseDown={updateActiveState}>
            <div className="rounded hover:bg-gray-800 text-white overflow-hidden hover:cursor-pointer py-4 border-b-4">
                <p className="font-bold text-xl mx-4 px-4" >{marker.locationName}</p>
                <p className="text-grey-700 text-base mx-4 px-4">{marker.locationDescription}</p>
                <button onClick={updateEditState} className="bg-green-500 hover:bg-green-700 text-white font-bold rounded mx-4 px-4"> Edit </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold rounded mx-4 px-4"> Delete </button>
                {marker.locationThumbnailURL ?
                    <img src={marker.locationThumbnailURL} alt="" />
                    : null}
            </div>
        </div>
    )
}