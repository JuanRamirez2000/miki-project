import axios from "axios";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import markerCardInfo from "src/interfaces/markerCardInfo";

export default function LocationForm({ setMarkers, setShowForm}: { 
    setMarkers: Dispatch<markerCardInfo[] | any>,
    setShowForm: Dispatch<boolean>
}) {
    const {register, handleSubmit} = useForm<markerCardInfo>();

    const onFormSubmit = async (data: markerCardInfo) => {
        setShowForm(false);
        let newLocation: markerCardInfo = {};
        let res = await axios.get('/findPlace', {
            params: {
                location: data.locationAddress
            }
        });
        newLocation = data;
        newLocation.locationCoordinates = res.data;
        newLocation.locationThumbnailURL = URL.createObjectURL(data.locationThumbnailFile[0]);
        setMarkers((prevLocaitons: markerCardInfo[]) => {
            return [...prevLocaitons, newLocation]
        });
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input placeholder="Name" {...register('locationName')}/>
                <textarea placeholder="Description" cols={30} rows={10} {...register('locationDescription')} />
                <input placeholder="Address" required={true} {...register('locationAddress')} />
                <input placeholder="Thumbnail" type={'file'} {...register('locationThumbnailFile')}/>
                <input type="submit" />
            </form>
        </div>
    )
}