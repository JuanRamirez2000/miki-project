import { Dispatch, useState } from "react";
import markerCardInfo from "src/interfaces/markerCardInfo";
import EditMarkerCardForm from "./EditMarkerCardForm";
import MarkerCard from "./MarkerCard";
import NewMarkerForm from "./NewMarkerForm";

export default function MarkerCardSidebar({ markerCards, setMarkerCards, setActiveMarker }: {
    markerCards: markerCardInfo[] | any,
    setMarkerCards: Dispatch<markerCardInfo[] | any>,
    setActiveMarker: Dispatch<string>
}) {
    const [addLocationForm, setAddMarkerForm] = useState<boolean>(false);
    const [editMarkerID, setEditMarkerID] = useState<string>("");

    return (
        <div className="basis-1/4 2xl:basis-1/3 bg-gray-600" id="locations-wrapper">
            {markerCards.map((marker: markerCardInfo, i: number) => {
                return editMarkerID !== marker.locationName ?
                    <MarkerCard
                        key={i}
                        marker={marker}
                        setActiveMarker={setActiveMarker}
                        setEditMarkerID={setEditMarkerID}
                    /> :
                    <EditMarkerCardForm key={i} markerCards={markerCards} marker={marker} setMarkerCards={setMarkerCards} setEditMarkerID={setEditMarkerID}/>
            })}
            {!addLocationForm &&
                <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded  mx-4"
                    onClick={() => { setAddMarkerForm(true) }}>Add Location</button>
            }

            {addLocationForm &&
                <NewMarkerForm setMarkers={setMarkerCards} setShowForm={setAddMarkerForm} />
            }
        </div>
    );
}