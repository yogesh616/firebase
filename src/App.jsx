import React, { useEffect } from 'react';
import { auth, provider } from './firebase.js';
import { signInWithRedirect, onAuthStateChanged } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import './App.css'

const App = () => {
  const signIn = async () => {
    try {
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
      if (user) {
        toast.success(`${user.displayName} logged in successfully!`);
       
          window.location.href = '/profile';
        
      } else if(!user)  {
       
         
        
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <>
      <div className='container text-center main'>
        <div className='title container'><p>Welcome to prodevs.</p></div>
        <div className='container-md text-center pt-3 px-3 bg-light'>

<button type="button" onClick={signIn} className="login-with-google-btn mb-3 w-100" >
  Sign in with Google
</button>


        </div>
      </div>
      <Toaster />
    </>
  );
};

export default App;
