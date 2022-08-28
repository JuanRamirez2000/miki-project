import axios from "axios";
import { Dispatch } from "react";
import markerCardInfo from "src/interfaces/markerCardInfo"

const JSON_BIN_URL = 'https://api.jsonbin.io/v3/b/630321c05c146d63ca79fe63';
const JSON_BIN_MASTER = process.env.REACT_APP_JSON_BIN_MASTER_KEY as string;

export default function MarkerCard({ marker, markerList, setMarkerList, setActiveMarker, setEditMarkerID }: {
    marker: markerCardInfo,
    markerList: markerCardInfo[],
    setMarkerList: Dispatch<markerCardInfo[]>
    setActiveMarker: Dispatch<string>,
    setEditMarkerID: Dispatch<string>
}) {

    let updateActiveState = () => {
        setActiveMarker(marker.locationName as string);
    }

    let updateEditState = () => {
        setEditMarkerID(marker.locationName);
    }

    //funciton used to delete a card
    let deleteCard = () => {
        //Filter list of cards and return the one where the name is the same
        //This will be replaced with unique cardID's in version 2
        let newMarkers = markerList.filter(removedMarker =>
            removedMarker.locationName !== marker.locationName
        )
        axios.put(JSON_BIN_URL, {
            markers: newMarkers
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSON_BIN_MASTER
            }
        })

        setMarkerList(newMarkers);
    }

    return (
        <div onMouseDown={updateActiveState}>
            <div className="rounded hover:bg-gray-800 text-white overflow-hidden hover:cursor-pointer py-4 border-b-4">
                <p className="font-bold text-xl mx-4 px-4" >{marker.locationName}</p>
                <p className="text-grey-700 text-base mx-4 px-4">{marker.locationDescription}</p>
                <button onClick={updateEditState} className="bg-green-500 hover:bg-green-700 text-white font-bold rounded mx-4 px-4"> Edit </button>
                <button onClick={deleteCard} className="bg-red-500 hover:bg-red-700 text-white font-bold rounded mx-4 px-4"> Delete </button>
                {/*marker.locationThumbnailURL ?
                    <img src={marker.locationThumbnailURL} alt="" />
                : null*/}
            </div>
        </div>
    )
}