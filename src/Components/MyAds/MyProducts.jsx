import React, { useState, useEffect } from "react";
import { UserAuth } from "../Context/Auth";
import { fetchUserProducts, deleteProduct, fetchFromFirestore } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Login from "../Modal/Login";
import Sell from "../Modal/Sell";
import Footer from "../Footer/Footer";
import { ItemsContext } from "../Context/Item";

const MyProducts = () => {
  const { user } = UserAuth();
  const { setItems } = ItemsContext();
  const [products, setProducts] = useState([]);
  const [openModal, setModal] = useState(false);
  const [openModalSell, setModalSell] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const toggleModal = () => setModal(!openModal);
  const toggleModalSell = () => setModalSell(!openModalSell);

  useEffect(() => {
    if (user) {
      const loadProducts = async () => {
        const userProducts = await fetchUserProducts(user.uid);
        console.log("Loaded user products:", userProducts);
        setProducts(userProducts);
      };
      loadProducts();
    } else {
      setProducts([]);
    }
  }, [user]);

  const handleDelete = async (productId) => {
    if (!user) return;
    if (window.confirm("Are you sure you want to delete this product?")) {
      const success = await deleteProduct(productId);
      if (success) {
        setProducts(products.filter((item) => item.id !== productId));
        const updatedItems = await fetchFromFirestore();
        setItems(updatedItems);
      }
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    toggleModalSell();
  };

  const refreshProducts = async () => {
    if (user) {
      const userProducts = await fetchUserProducts(user.uid);
      setProducts(userProducts);
      const updatedItems = await fetchFromFirestore();
      setItems(updatedItems);
    }
  };

  if (!user) {
    return (
      <div>
        <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
        <Login toggleModal={toggleModal} status={openModal} />
        <Sell setItems={setItems} toggleModalSell={toggleModalSell} status={openModalSell} />
        <div className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen">
          <h1 style={{ color: "#002f34" }} className="text-2xl font-bold mb-5">
            My Ads
          </h1>
          <p>Please log in to view your ads.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
      <Login toggleModal={toggleModal} status={openModal} />
      <Sell
        setItems={refreshProducts}
        toggleModalSell={toggleModalSell}
        status={openModalSell}
        editItem={editItem}
      />
      <div className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen">
        <h1 style={{ color: "#002f34" }} className="text-2xl font-bold mb-5">
          My Ads
        </h1>
        {products.length === 0 ? (
          <p>You haven't posted any ads yet.</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
            {products.map((item) => (
              <Link
                to={"/details"}
                state={{ item }}
                key={item.id}
                style={{ borderWidth: "1px", borderColor: "lightgray" }}
              >
                <div
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
                  </div>
                  <div className="absolute bottom-2 right-2 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEdit(item);
                      }}
                      className="p-1 bg-blue-500 text-white rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      className="p-1 bg-red-500 text-white rounded text-sm"
                    >
                      Delete
                    </button>
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

export default MyProducts;