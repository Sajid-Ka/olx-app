import { Link } from "react-router-dom"
import favorite from "../../assets/favorite.svg"
import favoriteFilled from "../../assets/favoritefilled.webp"
import React,{useState,useEffect} from "react"
import {UserAuth} from "../Context/Auth"
import { addToFavorites,removeFromFavorites,fetchFavorites } from "../Firebase/Firebase"

const Card = ({items,toggleModal}) => {
    const [displayCount,setDisplayCount] = useState(12);
    const [favorites,setFavorites] = useState([]);
    const {user} = UserAuth();
    const displayedItems = items.slice(0, displayCount);

    useEffect(() => {
        if (user) {
            const loadFavorites = async () => {
                try {
                    const favoriteItems = await fetchFavorites(user.uid);
                    setFavorites(favoriteItems.map((item) => item.id));
                } catch (error) {
                    console.error("Failed to load favorites:", error);
                }
            };
            loadFavorites();
        }
    },[user]);

    const handleFavoriteClick = async (e,itemId) => {
        e.preventDefault();
        e.stopPropagation();

        if(!user){
            toggleModal();
            return;
        }

        try {
            if (favorites.includes(itemId)) {
            await removeFromFavorites(user.uid, itemId);
            setFavorites(favorites.filter((id) => id !== itemId));
            } else {
            await addToFavorites(user.uid, itemId);
            setFavorites([...favorites, itemId]);
            }
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    }

    return (
        <div className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen">
             <h1 style={{color:"#002f34"}} className="text-2xl font-semibold mb-5">
                Fresh recommendations
            </h1>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
                {displayedItems.map((item) => (
                    <Link to={"/details"} state={{item}} key={item.id} style={{borderWidth:"1px", borderColor:"lightgray"}}>
                        <div 
                            key={item.id}
                            style={{borderWidth : "1px", borderColor: "lightgray"}}
                            className="relative w-full h-72 rounded-md border-solid bg-gray-50 overflow-hidden cursor-pointer"
                        >
                            {/* DisplayImages */}
                            <div className="w-full flex justify-center p-2 overflow-hidden">
                                <img 
                                    src={item.imageUrl  || "https://via.placeholder.com/150"} 
                                    alt={item.title} 
                                    className="h-36 object-contain"
                                />
                            </div>

                            {/* DisplayDetails */}
                            <div className="details p-1 pl-4 pr-4">
                                <h1 style={{color:"#002f34"}} className="font-bold text-xl">₹ {item.price}</h1>
                                <p className="text-sm pt-2">{item.category}</p>
                                <p className="pt-2">{item.title}</p>

                                {/* FavIcon */}
                                <div className="absolute flex justify-center items-center p-1 bg-white rounded-full top-3 right-3 cursor-pointer">
                                    <img 
                                        className={favorites.includes(item.id) ? "w-6 rounded-full" : "w-5"} 
                                        src={favorites.includes(item.id) ? favoriteFilled : favorite} 
                                        alt="favorite" 
                                        onClick={(e) => {
                                            handleFavoriteClick(e, item.id)
                                        }} 
                                    />
                                </div>
                            </div>

                        </div>
                    </Link>
                ))}

            </div>
            {displayCount === 12 && items.length > 12 && (
                <div className="flex justify-center mt-5">
                    <button
                        onClick={() => setDisplayCount(Math.min(20, items.length))}
                        className="p-3 rounded-lg text-white"
                        style={{background: "#002f34"}}
                    >
                        Load more
                    </button>
                </div>
            )}
        </div>
    )
}

export default Card