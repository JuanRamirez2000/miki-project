import { useEffect, useState } from "react";
import markerCardInfo from "src/interfaces/markerCardInfo";

export default function Marker(markerOptions: markerCardInfo){
    const [marker, setMarker] = useState<google.maps.Marker>();
    const infoWindow = new google.maps.InfoWindow()

    let infowWindowContent = 
        '<div>' +
            `<h1>${markerOptions.locationName}</h1>` +
            `<p>${markerOptions.locationDescription}</p>`+
        '</div>'

    //When there is no marker create a marker
    useEffect(()=> {
        if (!marker){
            setMarker(new google.maps.Marker());
        }

        //removes marker from map on unmount
        return() => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    //Set marker to a position with options
    useEffect(()=>{
        if (marker){
            marker.setOptions(markerOptions);
            infoWindow.setContent(infowWindowContent);
        }
    }, [marker, markerOptions, infoWindow, infowWindowContent])

    marker?.addListener('click', () => {
        infoWindow.open({
            anchor: marker,
            shouldFocus: false
        });
    });

    return(null);
}