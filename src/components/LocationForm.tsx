import axios from "axios";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import markerCardInfo from "src/interfaces/markerCardInfo";

export default function LocationForm({ setLocations, setShowForm, locations}: { 
    setLocations: Dispatch<markerCardInfo[] | any>,
    setShowForm: Dispatch<boolean>,
    locations: markerCardInfo[]
}) {
    const {register, handleSubmit} = useForm<markerCardInfo>();

    const onSubmit = async (data: markerCardInfo) => {
        setShowForm(false);
        let newLocation: markerCardInfo = {};
        let res = await axios.get('/findPlace', {
            params: {
                location: data.locationAddress
            }
        });
        newLocation = data;
        newLocation.locationCoordinates = res.data;
        setLocations([...locations, newLocation]);
    }

    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Name" {...register('locationName')}/>
                <textarea placeholder="Description" cols={30} rows={10} {...register('locationDescription')} />
                <input placeholder="Address" required={true} {...register('locationAddress')} />
                <input type="submit" />
            </form>
        </div>
    )
}