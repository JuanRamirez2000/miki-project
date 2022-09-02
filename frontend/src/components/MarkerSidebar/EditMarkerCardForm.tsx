import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import convertMarkersToFireStore from "src/helpers/convertMarkersToFireStore";
import markerCardInfo from "src/interfaces/markerCardInfo";

export default function EditMarkerCardForm({ marker, markerList, setMarkerList, setEditMarkerID, fireStoreDB, authUser }:
    {
        marker: markerCardInfo,
        markerList: markerCardInfo[],
        setMarkerList: Dispatch<markerCardInfo[]>,
        setEditMarkerID: Dispatch<string>,
        fireStoreDB: Firestore,
        authUser: Auth
    }) {
    const { register, handleSubmit } = useForm<markerCardInfo>()

    //This function creates a new editedObject then replaces it in the list
    const onFormSubmit = async (data) => {
        let editedMarker: markerCardInfo = data
        editedMarker.locationCoordinates = marker.locationCoordinates

        let newMarkers = markerList.map((unEditedMarker) => {
            if (unEditedMarker.locationName === marker.locationName) {
                return editedMarker
            }
            else {
                return unEditedMarker
            }
        })
        let markersRef = doc(fireStoreDB, 'users', authUser.currentUser.email)
        let markers = convertMarkersToFireStore(newMarkers);
        await setDoc(markersRef, { markers });
        setMarkerList(newMarkers);
        setEditMarkerID("");
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input defaultValue={marker.locationName} {...register('locationName')} />
                <textarea defaultValue={marker.locationDescription} cols={30} rows={10} {...register('locationDescription')} />
                <input type="submit" />
            </form>
        </div>
    );
}