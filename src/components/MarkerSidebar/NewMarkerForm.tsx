import axios from "axios";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import markerCardInfo from "src/interfaces/markerCardInfo";

const JSON_BIN_URL = 'https://api.jsonbin.io/v3/b/630321c05c146d63ca79fe63';
const JSON_BIN_MASTER = process.env.REACT_APP_JSON_BIN_MASTER_KEY as string;


export default function LocationForm({ markers, setMarkers, setShowForm }: {
    markers: markerCardInfo[],
    setMarkers: Dispatch<markerCardInfo[] | any>,
    setShowForm: Dispatch<boolean>
}) {
    const { register, handleSubmit } = useForm<markerCardInfo>();

    //Function used to add a new form
    const onFormSubmit = async (data: markerCardInfo) => {
        setShowForm(false);
        let newLocation: markerCardInfo = {};
        //Grab coordinate information from Google Maps GeoCoding API
        let res = await axios.get('/findPlace', {
            params: {
                location: data.locationAddress
            }
        });
        if (res.status === 200) {
            newLocation = data;
            newLocation.locationCoordinates = res.data;

            let newMarkers = [...markers, newLocation];

            //Update database to include new card
            //Selected data is posted due to limitations with files, this will be fixed in version 2.0
            axios.put(JSON_BIN_URL, {
                markers: newMarkers
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': JSON_BIN_MASTER
                }
            })
            /*
            if (data.locationThumbnailFile.length > 0 ){
                newLocation.locationThumbnailURL = URL.createObjectURL(data.locationThumbnailFile[0]);
            }
            */
            setMarkers(newMarkers)
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