import { createContext, useContext, useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { getAllFound, getAllLost } from "../api/posts";

export const PostContext = createContext();

export function usePost() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a provider");
  }
  return context;
}

export function PostProvider({ children }) {
  const [found, setFound] = useState([]);
  const [lost, setLost] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [status, setStatus] = useState(null);

  const {
    data: foundPosts,
    request: fetchFound,
    loading: fetchingFound,
    error: errFound,
  } = useApi(getAllFound);

  const {
    data: lostPosts,
    request: fetchLost,
    loading: fetchingLost,
    error: errLost,
  } = useApi(getAllLost);

  useEffect(() => {
    try {
      setLoading(true);
      fetchFound();
      fetchLost();
    } catch (error) {
      setError(true);
      setErrMsg(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setFound(foundPosts.data);
    setLost(lostPosts.data);
  }, [foundPosts, lostPosts]);

  // create post
  const createPost = async (data) => {

  };

  // edit post
  const editPost = async (id, data) => {

  };

  // delete post
  const deletePost = async (id) => {

  };

  // verifyPassword
  const verifyPassword = async (id, data) => {
    
  };

  const value = {
    found,
    lost,
    loading,
    errMsg,
    error,
    status,
    createPost,
    editPost,
    deletePost,
    verifyPassword,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
