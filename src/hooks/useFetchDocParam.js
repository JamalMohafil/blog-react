import React, { useCallback, useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useLocation } from "react-router-dom"; // استيراد useLocation من React Router

const useFetchDocParam = (colName, slug) => {
  const { db } = useContext(FirebaseContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const location = useLocation(); // استخدام useLocation للوصول إلى الـURL الحالي

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const colRef = collection(db, colName);
      const q = query(colRef, where("slug", "==", slug));
      const res = await getDocs(q);

      const resData = res.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt.toDate(),
        };
      });
      if (resData && resData.length) {
        setData(resData[0]);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [slug]); // تضمين slug في قائمة الاعتماديات لاستخدامه في useEffect

  // استدعاء getData عندما يتغير slug
  useEffect(() => {
    getData();
  }, [getData, location.pathname]); // استخدام location.pathname للوصول إلى الـURL الحالي

  return {
    getData,
    loading,
    error,
    data,
  };
};

export default useFetchDocParam;
