import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

const ProfileModal = ({ isOpen, onClose }) => {
    const handleLogout = () => {
        signOut(auth).catch((error) => console.error("Logout error: ", error));
        onClose();
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
                className="modal-content bg-white rounded-md p-4 shadow-lg w-[200px] text-center absolute top-[60px] right-[10px]"
            >
                <p
                    className="font-bold cursor-pointer p-2 hover:bg-gray-100 text-[#002f34]"
                    onClick={handleLogout}
                >
                    Logout
                </p>
            </div>
        </div>
    );
};

export default ProfileModal;