import markerCardInfo from "src/interfaces/markerCardInfo";

export default function convertMarkersToFireStore(markers: markerCardInfo[]) {
    let fireStoreData = [];
    markers.map((marker) => {
        let fireStoreMap = {
            locationName: marker.locationName,
            locationDescription: marker.locationDescription,
            locationCoordinates: marker.locationCoordinates
        }
        fireStoreData = [...fireStoreData, fireStoreMap]
    })
    return fireStoreData;
}