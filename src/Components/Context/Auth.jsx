import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, fireStore } from "../Firebase/Firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export const UserAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          await setDoc(
            doc(fireStore, "users", currentUser.uid),
            {
              email: currentUser.email,
              displayName: currentUser.displayName || "Anonymous",
              createdAt: new Date(),
            },
            { merge: true } 
          );
          console.log(`User document created/updated for ${currentUser.uid}`);
        } catch (error) {
          console.error("Error creating user document:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};