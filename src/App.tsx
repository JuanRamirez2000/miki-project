import './App.css';
import { Wrapper } from '@googlemaps/react-wrapper';
import Map from './components/Maps/Map';
import Marker from './components/Maps/Marker';
import markerCardInfo from './interfaces/markerCardInfo';
import MarkerCardSidebar from './components/MarkerSidebar/MarkerCardSidebar';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';
import ChooseAccount from './components/MarkerSidebar/ChooseAccount';

const { 
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID, 
  REACT_APP_MAPS_API_KEY } = process.env

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID
};

//initialize firebase app and auth for google Identity
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const GOOGLE_MAPS_API_KEY = REACT_APP_MAPS_API_KEY as string;

function App() {
  const [markers, setMarkers] = useState<markerCardInfo[] | any>([])
  const [activeMarkerID, setActiveMarkerID] = useState<string>("")
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false)

  //Checks whether a user is signed in or not
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user){
        console.log(`The user ${auth.currentUser.email} is signed in`)
        setUserSignedIn(true);
        getDoc(doc(db, 'users', auth.currentUser.email)).then((res) => {
          setMarkers(res.data()['markers']);
        });
      }
      else {
        console.log("No user is logged in");
      }
    });
  }, [])

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

      {userSignedIn && 
        <MarkerCardSidebar 
        markers={markers} 
        setMarkerList={setMarkers} 
        setActiveMarker={setActiveMarkerID}
        fireStoreDB={db}
        authUser={auth} /> 
      }
      {!userSignedIn && 
        <ChooseAccount 
          googleApp={app}/>  
      }
    </div>
  );
}

export default App;