import { FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function ChooseAccount({googleApp } :{
    googleApp: FirebaseApp    
    }) {

    const auth = getAuth(googleApp);

    let loginExistingUser = () => {
        const provider = new GoogleAuthProvider;
        signInWithPopup(auth, provider);
    }

    let createUser = () => {

    }
    return(
        <div className="basis-1/4 2xl:basis-1/3 flex flex-col gap-y-2 overflow-auto items-center bg-gray-600">
            <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded  mx-4" onClick={loginExistingUser}> 
                Login 
            </button>

            {/* 
            <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded  mx-4" onClick={loginGuestUser}> 
                Continue As Guest 
            </button>
            */}

            <button className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded  mx-4" onClick={createUser}> 
                Create Account 
            </button>

        </div>
    );
}