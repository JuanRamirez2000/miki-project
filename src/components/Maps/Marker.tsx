import { useEffect, useState } from "react";
import markerCardInfo from "src/interfaces/markerCardInfo";

export default function Marker(markerOptions: markerCardInfo) {
    const [marker, setMarker] = useState<google.maps.Marker>();
    const [infoWindow, setInfowWindow] = useState<google.maps.InfoWindow>();

    let smoothZoom = (
        map: google.maps.Map,
        max: number,
        cnt: number | undefined) => {
        if (cnt! >= max) {
            return;
        }
        else {
            let z = google.maps.event.addListener(map, 'zoom_changed', () => {
                google.maps.event.removeListener(z);
                smoothZoom(map, max, cnt! + 1);
            });
            setTimeout(() => { map.setZoom(cnt!) }, 80)
        }
    }

    let infoWindowDiv: string =
        `<div>` +
        `<p> ${markerOptions.locationName} </p>` +
        `<p> ${markerOptions.locationDescription} </p>` +
        `</div>`

    //Used to initialize and destroy a marker
    useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        //removes marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    //Used to set a marker
    useEffect(() => {
        if (marker) {
            marker.setOptions(markerOptions);
        }
    }, [marker, markerOptions]);

    //Used to initialize a info window
    useEffect(() => {
        if (!infoWindow) {
            setInfowWindow(new google.maps.InfoWindow({
                content: infoWindowDiv
            }))
        }
        return () => {
            infoWindow?.close();
        }
    }, [infoWindow, setInfowWindow, infoWindowDiv])

    //Used to open the info marker
    useEffect(() => {
        if (infoWindow) {
            marker!.addListener('click', () => {
                infoWindow!.open({
                    anchor: marker,
                    map: markerOptions.map,
                    shouldFocus: false
                })
            })
        }
    }, [infoWindow, marker, markerOptions.map])

    //Used to smooth zoom in the marker
    useEffect(() => {
        if (markerOptions.locationName === markerOptions.activeLocationID) {
            markerOptions.map?.panTo(marker?.getPosition());
            smoothZoom(markerOptions.map, 12, markerOptions.map?.getZoom())
        }
    }, [markerOptions, marker])

    return (null);
}