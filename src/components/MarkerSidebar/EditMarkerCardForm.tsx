import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import markerCardInfo from "src/interfaces/markerCardInfo";

export default function EditMarkerCardForm({ markerCards, marker, setMarkerCards, setEditMarkerID }:
    {
        markerCards: markerCardInfo[],
        marker: markerCardInfo,
        setMarkerCards: Dispatch<markerCardInfo[]>,
        setEditMarkerID: Dispatch<string>
    }) {
        const {register, handleSubmit} = useForm<markerCardInfo>()

        const onFormSubmit = (data) => {
            console.log(data);
            setEditMarkerID("");
        }
    return (
        <div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input defaultValue={marker.locationName} {...register('locationName')} />
                <textarea defaultValue={marker.locationDescription} cols={30} rows={10} {...register('locationDescription')}/>
                <input type={'file'} {...register('locationThumbnailFile')}/>
                <input type="submit" />
            </form>
        </div>
    );
}