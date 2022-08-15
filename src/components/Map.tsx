import React, { useRef, useState, useEffect } from "react";
import MapProps from "src/interfaces/mapProps";
import '../styles/map.css';

export default function Map( {children}: MapProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(()=>{
        if (ref.current && !map){
            setMap(new window.google.maps.Map(ref.current, {
                center: { lat: 39.8283, lng: -98.5795 },
                zoom: 5,
            }))
        }
    }, [ref, map])

    return(
        <div ref={ref} className='map'>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)){
                    return React.cloneElement(child, { map });
                }
                else {
                    return null;
                }
            })}
        </div>
    );
}