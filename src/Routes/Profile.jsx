import React, { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "../App.css";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../firebase.js";
const Profile = () => {
    const [userDetails, setUserDetails] = useState();
    const usersInfo = () => {
        onAuthStateChanged(auth, user => {
            console.log(user);
            setUserDetails(user);
            toast.success(`${user.displayName} logged in 🤩`)
        });
    };
    useEffect(() => {
        usersInfo();
    }, []);
    const logOut = async () => {
        await signOut(auth);
        window.location.href = "/";
    };
    return (
        <>
            {userDetails ? (
                <>
                    <nav className="navbar bg-body-tertiary">
                        <div className="container-fluid">
                           
                            <p className='navbar_
                            -brand'>{userDetails.displayName}</p>
                            <img
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%"
                                }}
                                src={userDetails.photoURL}
                                alt={userDetails.displayName}
                            />
                        </div>
                    </nav>
                    <button onClick={logOut} className="btn btn-secondary">
                        Log Out{" "}
                    </button>
                    <Toaster 
                    toastOptions={{duration: 3000,
                     className: 'toast'
                    }}
                    />
                </>
            ) : (
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </>
    );
};
export default Profile;
