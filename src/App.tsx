import './App.css';
import {Wrapper } from '@googlemaps/react-wrapper';
import Map from './components/Map';
import Marker from './components/Marker';
import markerCardInfo from './interfaces/markerCardInfo';
import { useState } from 'react';
import locationsData from './data/locationsData.json';
import Locations from './components/Locations';

const MAPS_KEY = process.env.REACT_APP_MAPS_API as string;

function App() {

  const [markers, setMarkers] = useState<markerCardInfo[] | any>(locationsData)
  const [activeLocation, setActiveLocation] = useState<markerCardInfo[] | any>(locationsData[0])

  return (
    <div className="App">
      <Wrapper apiKey={MAPS_KEY}>
        <Map> 
          {markers.map((marker: markerCardInfo, i: number) => 
            (<Marker 
              key={i} 
              position={marker.locationCoordinates}
              locationName={marker.locationName}
              locationDescription={marker.locationDescription}
              animation = {
                (marker.locationCoordinates?.lat === activeLocation.lat && 
                  marker.locationCoordinates?.lng === activeLocation.lng) ? 
                  google.maps.Animation.BOUNCE: undefined
              }
              /> ))}
        </Map>
      </Wrapper>
      <Locations locations={markers} setLocations={setMarkers} setActiveLocation={setActiveLocation}/>
    </div>
  );
}

export default App;
