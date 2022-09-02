import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { Dispatch, useState } from "react";
import markerCardInfo from "src/interfaces/markerCardInfo";
import EditMarkerCardForm from "./EditMarkerCardForm";
import MarkerCard from "./MarkerCard";
import NewMarkerForm from "./NewMarkerForm";

export default function MarkerCardSidebar({ markers, setMarkerList, setActiveMarker, fireStoreDB, authUser }: {
    markers: markerCardInfo[] | any,
    setMarkerList: Dispatch<markerCardInfo[] | any>,
    setActiveMarker: Dispatch<string>,
    fireStoreDB: Firestore,
    authUser: Auth
}) {
    const [addLocationForm, setAddMarkerForm] = useState<boolean>(false);
    const [editMarkerID, setEditMarkerID] = useState<string>("");

    let signOutUser = () => {
        authUser.signOut()
        setMarkerList([]);
    }

    return (
        <div className="basis-1/4 2xl:basis-1/3 overflow-auto bg-gray-600" id="locations-wrapper">
            {markers.map((marker: markerCardInfo, i: number) => {
                return editMarkerID !== marker.locationName ?
                    <MarkerCard
                        key={i}
                        marker={marker}
                        markerList={markers}
                        setMarkerList={setMarkerList}
                        setActiveMarker={setActiveMarker}
                        setEditMarkerID={setEditMarkerID}
                        fireStoreDB={fireStoreDB}
                        authUser={authUser}
                    /> :
                    <EditMarkerCardForm
                        key={i}
                        marker={marker}
                        markerList={markers}
                        setMarkerList={setMarkerList}
                        setEditMarkerID={setEditMarkerID}
                        fireStoreDB={fireStoreDB}
                        authUser={authUser}
                    />
            })}
            {!addLocationForm &&
                <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded  mx-4"
                    onClick={() => { setAddMarkerForm(true) }}>Add Location</button>
            }

            {addLocationForm &&
                <NewMarkerForm
                    markers={markers}
                    setMarkers={setMarkerList}
                    setShowForm={setAddMarkerForm}
                    fireStoreDB={fireStoreDB}
                    authUser={authUser} />
            }

            {
                <button className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded  mx-4" onClick={signOutUser}> Sign Out</button>
            }
        </div>
    );
}