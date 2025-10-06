import { collection,getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { fireStore } from "../Firebase/Firebase";


const context = createContext(null);

export const ItemsContext = () => useContext(context);

export const ItemsContextProvider = ({children}) => {
    const [items,setItems] = useState([]);

    useEffect(() => {
        const fetchItemsFromFirestore = async () => {
            try {

                const productsCollection = collection(fireStore,"Products");
                const productSnapshot = await getDocs(productsCollection);
                const productsList = productSnapshot.docs.map(doc => ({
                    id:doc.id,
                    ...doc.data(),
                }));

                setItems(productsList)
                
            } catch (error) {
                console.log("error fetching products ", error)
            }
        }

        fetchItemsFromFirestore();
        
    },[])

    return (
        <context.Provider value={{items,setItems}}>
            {children}
        </context.Provider>
    )
}