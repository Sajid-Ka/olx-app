import React, { useEffect, useState } from "react";
import { UserAuth } from "../Context/Auth";
import { fetchFavorites } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Login from "../Modal/Login";
import Sell from "../Modal/Sell";
import Footer from "../Footer/Footer";
import favoriteFilled from "../../assets/favoritefilled.webp";
import { removeFromFavorites } from "../Firebase/Firebase";

const Favorites = () => {
  const { user } = UserAuth();
  const [favorites, setFavorites] = useState([]);
  const [openModal, setModal] = useState(false);
  const [openModalSell, setModalSell] = useState(false);

  const toggleModal = () => {
    setModal(!openModal);
  };

  const toggleModalSell = () => {
    setModalSell(!openModalSell);
  };

  useEffect(() => {
    if (user) {
      const loadFavorites = async () => {
        const favoriteItems = await fetchFavorites(user.uid);
        setFavorites(favoriteItems);
      };
      loadFavorites();
    }
  }, [user]);

  const handleFavoriteClick = async (itemId) => {
    if (!user) {
      toggleModal();
      return;
    }

    await removeFromFavorites(user.uid, itemId);
    setFavorites(favorites.filter((item) => item.id !== itemId));
  };

  if (!user) {
    return (
      <div>
        <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
        <Login toggleModal={toggleModal} status={openModal} />
        <Sell setItems={() => {}} toggleModalSell={toggleModalSell} status={openModalSell} />
        <div className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen">
          <h1 style={{ color: "#002f34" }} className="text-2xl font-bold-sm mb-5">
            Favorites
          </h1>
          <p>Please log in to view your favorite items.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
      <Login toggleModal={toggleModal} status={openModal} />
      <Sell setItems={() => {}} toggleModalSell={toggleModalSell} status={openModalSell} />
      <div className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen">
        <h1 style={{ color: "#002f34" }} className="text-2xl font-bold-sm mb-5">
          Favorites
        </h1>
        {favorites.length === 0 ? (
          <p>No favorite items yet.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
            {favorites.map((item) => (
              <Link
                to={"/details"}
                state={{ item }}
                key={item.id}
                style={{ borderWidth: "1px", borderColor: "lightgray" }}
              >
                <div
                  key={item.id}
                  style={{ borderWidth: "1px", borderColor: "lightgray" }}
                  className="relative w-full h-72 rounded-md border-solid bg-gray-50 overflow-hidden cursor-pointer"
                >
                  <div className="w-full flex justify-center p-2 overflow-hidden">
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/150"}
                      alt={item.title}
                      className="h-36 object-contain"
                    />
                  </div>
                  <div className="details p-1 pl-4 pr-4">
                    <h1 style={{ color: "#002f34" }} className="font-bold text-xl">
                      ₹ {item.price}
                    </h1>
                    <p className="text-sm pt-2">{item.category}</p>
                    <p className="pt-2">{item.title}</p>
                    <div className="absolute flex justify-center items-center p-2 bg-white rounded-full top-3 right-3 cursor-pointer">
                      <img
                        className="w-5"
                        src={favoriteFilled}
                        alt="favorite"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleFavoriteClick(item.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;