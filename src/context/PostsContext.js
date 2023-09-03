import { createContext, useCallback } from "react";
import useFetchCollection from "../hooks/useFetchCollection";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const { getData, getNextData, data, loading, error, fetching ,lastDoc} =
    useFetchCollection("posts");

  const fetch = useCallback(() => {
    if (!data) {
      getData();
    }
  }, [data, getData]);
  const fetchNext = useCallback(() => {
    if (data && !loading && !fetching && lastDoc) {
      getNextData(lastDoc);
    }
  }, [data, getNextData,loading,fetching,lastDoc]);
  
  const refetch = getData
  return (
    <PostsContext.Provider value={{ fetch, data, loading, error ,fetchNext,fetching,refetch}}>
      {children}
    </PostsContext.Provider>
  );
};
