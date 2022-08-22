import './App.css';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from './components/Maps/Map';
import Marker from './components/Maps/Marker';
import markerCardInfo from './interfaces/markerCardInfo';
import { useState } from 'react';
import locationsData from './data/locationsData.json';
import MarkerCardSidebar from './components/MarkerSidebar/MarkerCardSidebar';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_MAPS_API as string;

function App() {

  const [markers, setMarkers] = useState<markerCardInfo[]>(locationsData)
  const [activeMarkerID, setActiveMarkerID] = useState<string>("");

  return (
    <div className="flex h-full flex-col md:flex-row">
      <Wrapper apiKey={GOOGLE_MAPS_API_KEY}>
        <Map>
          {markers.map((marker: markerCardInfo, i: number) =>
          (<Marker
            key={i}
            position={marker.locationCoordinates}
            locationName={marker.locationName}
            locationDescription={marker.locationDescription}
            activeLocationID={activeMarkerID}
          />))}
        </Map>
      </Wrapper>
      <MarkerCardSidebar markerCards={markers} setMarkerCards={setMarkers} setActiveMarker={setActiveMarkerID} />
    </div>
  );
}

export default App;
