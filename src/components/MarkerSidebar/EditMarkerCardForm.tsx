import axios from "axios";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import markerCardInfo from "src/interfaces/markerCardInfo";

const JSON_BIN_URL = 'https://api.jsonbin.io/v3/b/630321c05c146d63ca79fe63';
const JSON_BIN_MASTER = process.env.REACT_APP_JSON_BIN_MASTER_KEY as string;

export default function EditMarkerCardForm({ marker, markerList, setMarkerList, setEditMarkerID }:
    {
        marker: markerCardInfo,
        markerList: markerCardInfo[],
        setMarkerList: Dispatch<markerCardInfo[]>,
        setEditMarkerID: Dispatch<string>
    }) {
    const { register, handleSubmit } = useForm<markerCardInfo>()

    //This function creates a new editedObject then replaces it in the list
    const onFormSubmit = (data) => {
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

        axios.put(JSON_BIN_URL, {
            markers: newMarkers
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSON_BIN_MASTER
            }
        });

        setMarkerList(newMarkers);
        setEditMarkerID("");
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input defaultValue={marker.locationName} {...register('locationName')} />
                <textarea defaultValue={marker.locationDescription} cols={30} rows={10} {...register('locationDescription')} />
                {/* 
                <input type={'file'} {...register('locationThumbnailFile')}/>
                */}
                <input type="submit" />
            </form>
        </div>
    );
}