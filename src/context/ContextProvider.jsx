import React from "react";
import { FirebaseProvider } from "./FirebaseContext";
import { PostsProvider } from "./PostsContext";
import { AuthProvider } from "./AuthContext";

const ContextProvider = ({ children }) => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <PostsProvider>{children}</PostsProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
};

export default ContextProvider;
