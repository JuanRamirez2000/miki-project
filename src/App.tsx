import './App.css';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from './components/Maps/Map';
import Marker from './components/Maps/Marker';
import markerCardInfo from './interfaces/markerCardInfo';
import MarkerCardSidebar from './components/MarkerSidebar/MarkerCardSidebar';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc,  getDoc } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

//initialize firebase app and auth for google Identity
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(); 
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_MAPS_API_KEY as string;

function App() {
  const [markers, setMarkers] = useState<markerCardInfo[] | any>([])
  const [activeMarkerID, setActiveMarkerID] = useState<string>("")

  //Checks whether a user is signed in or not
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user){
        console.log(auth.currentUser)
      }
      else {
        signInWithPopup(auth, provider);
        console.log("No user is logged in")
      }
    });
  })

  let getUserInfo = () => {
      getDoc(doc(db, 'users', auth.currentUser.email)).then((res) => {
        setMarkers(res.data()['markers']);
     })
  }

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
      <MarkerCardSidebar 
        markers={markers} 
        setMarkerList={setMarkers} 
        setActiveMarker= {setActiveMarkerID} /> 
      <button onClick={getUserInfo}> Testing button</button>
    </div>
  );
}

export default App;