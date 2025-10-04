import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom"
import "./Navbar.css"
import logo from "../../assets/olx_logo_2025.svg"
import searchIcon from "../../assets/search1.svg"
import searchIcon2 from "../../assets/search.svg"
import arrowDown from "../../assets/arrow-down.svg"
import heartIcon from "../../assets/favorite.svg"
import sellButton from "../../assets/addButton.png"



const Navbar = ({onLoginClick}) => {
    const {user} = useAuth();
    const navigate = useNavigate();

    const [location, setLocation] = useState("India");
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [searchQuery,setSearchQuery] = useState("");
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [category, setCategory] = useState("ALL CATEGORIES");

    const locations = ["India","Kerala", "Tamil Nadu", "Karnataka", "Delhi"];
    const categories = [
        "All Categories",
        "Cars",
        "Bikes",
        "Mobiles",
        "Fashion",
        "Books, Sports & Hobbies",
        "Electronics & Appliances"
    ]

    const handleArrowClick = (e, dropdownType) => {
        e.preventDefault();
        if(dropdownType === "location"){
            setShowLocationDropdown(!showLocationDropdown);
            setShowLanguageDropdown(false);
        }else if(dropdownType === "language"){
            setShowLanguageDropdown(!showLanguageDropdown);
            setShowLocationDropdown(false);
        }
        
    }

    const selectLocation = (loc) => {
        setLocation(loc);
        setShowLocationDropdown(false);
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
            alert("Logged out successfully");
        }catch (error) {
            alert("Logout Failed : ", error.message);
        }
    }

    return (
        <div>
            <nav className="flex items-center justify-between p-2 shadow-md h-16">
                <div className="flex items-center space-x-3.5 flex-1">
                    <Link to="/">
                        <img src={logo} alt="OLX" className="h-12 ml-2 mr-1" />
                    </Link>
                    <div className="relative bg-white w-full max-w-[275px]">
                        <div className="flex items-center border-2 border-black rounded h-12 overflow-hidden">
                            <img src={searchIcon} alt="search" className="h-5 w-5 ml-2" />
                            <input 
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="outline-none px-2 text-m bg-transparent flex-1"
                            />
                            <img 
                                src={arrowDown} 
                                alt="dropdown" 
                                className="h-5 w-5 mr-3 cursor-pointer" 
                                onClick={(e) => handleArrowClick(e,"location")} 
                            />
                        </div>
                        {showLocationDropdown && (
                            <div className="absolute top-full mt-1 w-32 bg-white border-2 border-black rounded shadow-md">
                                {locations.map((loc)=> (
                                    <div
                                        key={loc}
                                        onClick={() => selectLocation(loc)}
                                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {loc}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center border-2 border-black rounded h-12 overflow-hidden bg-white flex-1 max-w-[1180px]">
                            <input
                                type="text"
                                placeholder='Find Cars, Mobile Phones and more...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="outline-none px-4 mb-1  text-m flex-1"
                                style={{boxSizing: "border-box"}}
                            />
                            <div 
                                className="bg-black rounded-r flex items-center justify-center cursor-pointer mr-[-3px] " 
                                style={{height:"100%", width:"50px", borderLeft: "5px solid black"}}>
                                    <img 
                                        src={searchIcon2} 
                                        alt="search" 
                                        className="h-6 w-6 m-0 p-0"
                                    />
                            </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 justify-start mr-4">
                    <div className="relative language-container">
                        <div
                            className="flex items-center text-sm p-1 cursor-pointer mb-1"
                            onClick={(e) => handleArrowClick(e, "language")}
                        >
                            <span className="font-bold">ENGLISH</span>
                            <img 
                                src={arrowDown} 
                                alt="dropdown" 
                                className="h-5 w-5 ml-2 cursor-pointer" 
                                onClick={(e) => handleArrowClick(e, "language")} 
                            />
                        </div>
                        {showLanguageDropdown && (
                            <div className="absolute top-full mt-1 w-32 bg-white border-2 border-black rounded shadow-md"> 
                                <div
                                    className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setShowLanguageDropdown(false)}
                                >
                                    ENGLISH
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <img src={heartIcon} alt="favorites" className="h-5 w-5 mr-2" />
                        {user ? (
                            <>
                            <button
                                onClick={handleLogout}
                                className="text-black font-bold border-b-2 border-black hover:border-b-0"
                            >
                                Logout
                            </button>
                            </>
                        ) : (
                            <button
                                onClick={onLoginClick}
                                className="text-black font-bold border-b-2 border-black hover:border-b-0"
                            >
                                Login
                            </button>
                        )}
                        <Link
                            to="/post"
                            className="relative inline-flex items-center justify-center "
                            >
                            <img 
                                src={sellButton} 
                                alt="Sell Button"
                                className="w-[100px] h-[50px] mr-2" 
                            />
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="bg-white h-1 shadow-md">

            </div>

            <div className="bg-gray-100 p-1">
                {categories.slice(1).map((cat) => (
                <span
                    key={cat}
                    className="mx-2 text-xs text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                    {cat}
                </span>
                ))}
            </div>
        </div>
    );
};

export default Navbar