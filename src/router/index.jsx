import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import DefaultLayout from "../layouts/DefaultLayout";
import Blog from "../pages/blog/Blog";
import NewPost from "../pages/blog/NewPost";
import Article from "../pages/blog/Article";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import { AuthContext } from "../context/AuthContext";

const MainLayout = () => {
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/blog" element={<DefaultLayout />}>
          <Route index element={<Blog />} />
          <Route path=":slug" element={<Article />} />
          {isAuth ? (
            <Route path="new" element={<NewPost />} />
          ) : (
            <Route path="new" element={<Navigate to="/login" replace />} />
          )}
        </Route>
        <Route path="/" element={<AuthLayout />}>
          {!isAuth ? (
            <Route path="login" element={<Login />} />
          ) : 
            navigate('/')}
          {!isAuth ? (
            <Route path="signup" element={<SignUp />} />
          ) : (
            <Route path="signup" element={<Navigate to="/blog" replace />} />
          )}
        </Route>
      </Routes>
    </>
  );
};

export default MainLayout;
