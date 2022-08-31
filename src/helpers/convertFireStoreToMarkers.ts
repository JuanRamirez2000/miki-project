import markerCardInfo from "src/interfaces/markerCardInfo";

export default function convertFireStoreToMarkers(firestoreData) {
    let newMarkers: markerCardInfo[] = [];

    firestoreData.map((data) => {
        let marker: markerCardInfo = {}
        let { locationName, locationDescription } = data;

        marker.locationName = locationName;
        marker.locationDescription = locationDescription;
        marker.locationCoordinates = {
            lat: data['locationCoordinates'][0],
            lng: data['locationCoordinates'][1]
        } as google.maps.LatLngAltitudeLiteral
        newMarkers = [...newMarkers, marker];
    });
    return newMarkers
}