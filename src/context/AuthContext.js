import { createContext, useContext, useEffect, useState } from "react";
import { FirebaseContext } from "./FirebaseContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import Cookies from "js-cookie"; // استيراد مكتبة js-cookie

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { app } = useContext(FirebaseContext);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // حفظ بيانات المستخدم في ملف الـ cookie عند تسجيل الدخول
      if (user) {
        Cookies.set("user", JSON.stringify(user));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const signup = async ({ email, password }) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    Cookies.remove("user");
  };

  return (
    <AuthContext.Provider value={{ signup, login, isAuth: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
