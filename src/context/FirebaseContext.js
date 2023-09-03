import { createContext } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../constants/firebaseConfig";
import { getFirestore } from "firebase/firestore";
export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();

  return (
    <FirebaseContext.Provider
      value={{
        app,
        db,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
