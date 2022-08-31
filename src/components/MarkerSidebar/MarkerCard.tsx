import { Auth } from "firebase/auth";
import { doc, Firestore, setDoc } from "firebase/firestore";
import { Dispatch } from "react";
import convertMarkersToFireStore from "src/helpers/convertMarkersToFireStore";
import markerCardInfo from "src/interfaces/markerCardInfo"

export default function MarkerCard({ marker, markerList, setMarkerList, setActiveMarker, setEditMarkerID, fireStoreDB, authUser }: {
    marker: markerCardInfo,
    markerList: markerCardInfo[],
    setMarkerList: Dispatch<markerCardInfo[]>
    setActiveMarker: Dispatch<string>,
    setEditMarkerID: Dispatch<string>,
    fireStoreDB: Firestore,
    authUser: Auth
}) {

    let updateActiveState = () => {
        setActiveMarker(marker.locationName as string);
    }

    let updateEditState = () => {
        setEditMarkerID(marker.locationName);
    }

    //funciton used to delete a card
    let deleteCard = async () => {
        //Filter list of cards and return the one where the name is the same
        //This will be replaced with unique cardID's in version 
        let newMarkers = markerList.filter(removedMarker =>
            removedMarker.locationName !== marker.locationName
        )

        let markersRef = doc(fireStoreDB, 'users', authUser.currentUser.email)
        let markers = convertMarkersToFireStore(newMarkers);
        await setDoc(markersRef, { markers });
        setMarkerList(newMarkers);
    }

    return (
        <div onMouseDown={updateActiveState}>
            <div className="rounded hover:bg-gray-800 text-white overflow-hidden hover:cursor-pointer py-4 border-b-4">
                <p className="font-bold text-xl mx-4 px-4" >{marker.locationName}</p>
                <p className="text-grey-700 text-base mx-4 px-4">{marker.locationDescription}</p>
                <button onClick={updateEditState} className="bg-green-500 hover:bg-green-700 text-white font-bold rounded mx-4 px-4"> Edit </button>
                <button onClick={deleteCard} className="bg-red-500 hover:bg-red-700 text-white font-bold rounded mx-4 px-4"> Delete </button>
            </div>
        </div>
    )
}