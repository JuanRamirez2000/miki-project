import axios from "axios";
import { Auth } from "firebase/auth";
import { doc, Firestore, updateDoc, arrayUnion } from "firebase/firestore";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import markerCardInfo from "src/interfaces/markerCardInfo";

export default function LocationForm({ markers, setMarkers, setShowForm, fireStoreDB, authUser }: {
    markers: markerCardInfo[],
    setMarkers: Dispatch<markerCardInfo[] | any>,
    setShowForm: Dispatch<boolean>,
    fireStoreDB: Firestore,
    authUser: Auth
}) {
    const { register, handleSubmit } = useForm<markerCardInfo>();

    //Function used to add a new form
    const onFormSubmit = async (data: markerCardInfo) => {
        setShowForm(false);
        let newLocation: markerCardInfo = {};
        //Grab coordinate information from Google Maps GeoCoding API
        let res = await axios.get('/api/findPlace', {   
            headers: {
                "Accept": "applicaiton/json",
                "Content-Type": "Application/json"
            },
            params: {
                location: data.locationAddress
            }
        });

        if (res.status === 200) {
            newLocation = data;
            newLocation.locationCoordinates = res.data;

            let newMarkers = [...markers, newLocation];
            const markersRef = doc(fireStoreDB, 'users', authUser.currentUser.email);
            await updateDoc(markersRef, {
                markers: arrayUnion({
                    locationName: newLocation.locationName,
                    locationDescription: newLocation.locationDescription,
                    locationCoordinates: newLocation.locationCoordinates
                })
            });
            setMarkers(newMarkers);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input placeholder="Name" {...register('locationName')} />
                <textarea placeholder="Description" cols={30} rows={10} {...register('locationDescription')} />
                <input placeholder="Address" required={true} {...register('locationAddress')} />
                {/*
                    <input placeholder="Thumbnail" type={'file'} {...register('locationThumbnailFile')}/>
                */}
                <input type="submit" />
            </form>
        </div>
    )
}