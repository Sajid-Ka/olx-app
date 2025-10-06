import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getStorage} from "firebase/storage"
import {getFirestore,collection,getDocs} from "firebase/firestore"

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
        const productsCollection = collection(fireStore,"Products");
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
        }));
        console.log("Fetched products from Firestore ", productList)
        return productList;
        
    } catch (error) {
        console.error("Error fetching products from Firestore: ",error);
        return[]
    }
}

export {
    auth,
    provider,
    storage,
    fireStore,
    fetchFromFirestore
}