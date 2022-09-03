// @ts-ignore
import React, { useRef, useState, useEffect } from "react";
import MapProps from "src/interfaces/mapProps";

export default function Map({ children }: MapProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    //Create a new map if there currently isn't a map
    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {
                center: { lat: 39.8283, lng: -98.5795 },
                zoom: 5,
                mapTypeControl: false,
                streetViewControl: false
            }))
        }
    }, [ref, map])

    return (
        <div ref={ref} className='grow'>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { map });
                }
                else {
                    return null;
                }
            })}
        </div>
    );
}