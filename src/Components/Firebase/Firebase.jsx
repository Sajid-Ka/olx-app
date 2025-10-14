import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs, setDoc, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { use } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyALeSDvpskjOp6cw_1F9wIT6VI_SyToAg0",
  authDomain: "olx-clone-77082.firebaseapp.com",
  projectId: "olx-clone-77082",
  storageBucket: "olx-clone-77082.firebasestorage.app",
  messagingSenderId: "1064621628898",
  appId: "1:1064621628898:web:443b5d8669c2427c3d2dbb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage();
const fireStore = getFirestore();

const fetchFromFirestore = async () => {
  try {
    const productsCollection = collection(fireStore, "Products");
    const productSnapshot = await getDocs(productsCollection);
    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log("Fetched products from Firestore ", productList);
    return productList;
  } catch (error) {
    console.error("Error fetching products from Firestore: ", error);
    return [];
  }
};

const addToFavorites = async (userId, itemId) => {
  try {
    const favoriteDoc = doc(fireStore, `users/${userId}/favorites/${itemId}`);
    await setDoc(favoriteDoc, {
      itemId,
      timestamp: new Date(),
    });
    console.log(`Added item ${itemId} to favorites for user ${userId}`);
  } catch (error) {
    console.error("Error adding to favorites: ", error);
  }
};

const removeFromFavorites = async (userId, itemId) => {
  try {
    const favoriteDoc = doc(fireStore, `users/${userId}/favorites/${itemId}`);
    await deleteDoc(favoriteDoc);
    console.log(`Removed item ${itemId} from favorites for user ${userId}`);
  } catch (error) {
    console.error("Error removing from favorites: ", error);
  }
};

const fetchFavorites = async (userId) => {
  try {
    const favoriteRef = collection(fireStore, `users/${userId}/favorites`);
    const favoriteSnapshot = await getDocs(favoriteRef);
    const favoriteIds = favoriteSnapshot.docs.map((doc) => doc.id);

    const productsCollection = collection(fireStore, "Products");
    const productSnapshot = await getDocs(productsCollection);
    const favoriteItems = productSnapshot.docs
      .filter((doc) => favoriteIds.includes(doc.id))
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    return favoriteItems;
  } catch (error) {
    console.error("Error fetching favorites: ", error);
    return [];
  }
};

const fetchUserProducts = async (userId) => {
  try {
    const productsQuery = query(collection(fireStore,"Products"), where("userId", "==", userId));
    const productSnapshot = await getDocs(productsQuery);
    const userProducts = productSnapshot.docs.map((doc) => ({
      id:doc.id,
      ...doc.data(),
    }));
    console.log("Fetchd user products : ",userProducts);
    return userProducts;
  } catch (error) {
    console.error("Error fetching user products : ", error);
    return [];
  }
}

const updateProduct = async (productId,updatedData) => {
  try {
    const productDoc = doc(fireStore,"Products",productId);
    await updateDoc(productDoc,updatedData);
    console.log(`Successfully updated product ${productId}`);
    return true;
  } catch (error) {
    console.error("Error updating product : ",error);
    return false;
  }
}

const deleteProduct = async (productId) => {
  try {
    const productDoc = doc(fireStore,"Products",productId);
    await deleteDoc(productDoc);
    console.log(`Successfully deleted product ${productId}`);
    return true;
  } catch (error) {
    console.error("Error deleting product : ",error);
    return false;
  }
}

export {
  auth,
  provider,
  storage,
  fireStore,
  fetchFromFirestore,
  addToFavorites,
  removeFromFavorites,
  fetchFavorites,
  fetchUserProducts,
  updateProduct,
  deleteProduct,
};