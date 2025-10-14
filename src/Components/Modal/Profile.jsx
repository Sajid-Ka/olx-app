import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import leftArro from "../../assets/left-arrow.png"
import paperIcon from "../../assets/pencil-with-paper.png"
import { Link } from "react-router-dom";

const ProfileModal = ({ isOpen, onClose }) => {
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                onClose();
                window.location.reload();
            })
            .catch((error) => console.error("Logout error: ", error));
    };

    const handleOutsideClick = (e) => {
        if (e.target.className.includes('modal-overlay')) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="modal-overlay fixed inset-0 bg-transparent flex items-start justify-end z-[70]"
            onClick={handleOutsideClick}
        >
            <div 
                className="modal-content bg-white items-center flex flex-col rounded-md shadow-lg w-[130px] text-center absolute top-[60px] mr-20"
            >
                <Link to="/my-products" onClick={onClose}>
                <div className="flex items-center pb-1">
                <img src={paperIcon} alt="left-arrow" className="w-12 h-12 mr-2 cursor-pointer" />
                <p className="font-bold cursor-pointer text-[#002f34]">
                    My Ads
                </p>
                </div>
                </Link>
                <div className="flex items-center" onClick={handleLogout}>
                <img src={leftArro} alt="left-arrow" className="w-8 h-8 cursor-pointer" />
                <p className="font-bold cursor-pointer p-2 text-[#002f34]">
                    Logout
                </p>
                </div>
            </div>
        </div>
  );
};

export default ProfileModal;