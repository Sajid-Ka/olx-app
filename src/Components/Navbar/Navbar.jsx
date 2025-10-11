import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/olx_logo_2025.svg";
import search from "../../assets/search1.svg";
import arrow from "../../assets/arrow-down.svg";
import searchwt from "../../assets/search.svg";
import avatar from "../../assets/avatar_2.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/Firebase";
import addBtn from "../../assets/addButton.png";
import ProfileModal from "../Modal/Profile";

const Navbar = ({ toggleModal, toggleModalSell }) => {
    const [user] = useAuthState(auth);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModalLogout = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <nav className="fixed z-50 w-full p-2 pl-3 pr-3 shadow-md bg-slate-100 border-b-4 border-solid border-b-white flex items-center justify-between">
                <img src={logo} alt="" className="w-12" />
                <div className="relative location-search ml-5">
                    <img src={search} alt="" className="absolute top-4 left-2 w-5" />
                    <input
                        placeholder="India"
                        className="w-[50px] sm:w-[150px] md:w-[250px] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"
                        type="text"
                    />
                    <img src={arrow} alt="" className="absolute top-4 right-3 w-5 cursor-pointer" />
                </div>

                <div className="ml-5 mr-2 relative w-full main-search">
                    <input
                        type="text"
                        placeholder="Find Cars, Mobile Phones and more..."
                        className="w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"
                    />
                    <div
                        style={{ backgroundColor: "#000000ff" }}
                        className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12"
                    >
                        <img src={searchwt} alt="search Icon" className="w-6 filter" />
                    </div>
                </div>

                <div className="mx-1 sm:ml-5 sm:mr-5 relative lang">
                    <p className="font-bold mr-3">ENGLISH</p>
                    <img src={arrow} className="w-5 cursor-pointer" />
                </div>

                {!user ? (
                    <p
                        className="font-bold underline ml-5 cursor-pointer"
                        style={{ color: "#002f34" }}
                        onClick={toggleModal}
                    >
                        Login
                    </p>
                ) : (
                    <div className="relative flex items-center ml-5">
                        <img
                            src={avatar}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            onClick={toggleModalLogout}
                        />
                        <img
                            src={arrow}
                            alt="Dropdown Arrow"
                            className="w-4 ml-2 cursor-pointer"
                            onClick={toggleModalLogout}
                        />
                    </div>
                )}

                <img
                    src={addBtn}
                    alt=""
                    className="w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer"
                    onClick={user ? toggleModalSell : toggleModal}
                />
            </nav>

            <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="w-full relative z-10 flex shadow-md p-2 pt-20 pl-10 pr-10 sm:pl-44 md:pr-44 sub-lists fixed">
                <ul className="list-none flex items-center justify-center w-full">
                    <div className="flex flex-shrink-0">
                        <p className="font-bold uppercase all-cats">All categories</p>
                        <img className="w-4 ml-2" src={arrow} alt="" />
                        <li>Cars</li>
                        <li>Motorcycles</li>
                        <li>Mobile Phones</li>
                        <li>For Sale: Houses & Apartments</li>
                        <li>Scooters</li>
                        <li>Commercial & Other Vehicles</li>
                        <li>For Rent: Houses & Apartments</li>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;