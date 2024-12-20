import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added this line
import { format } from "date-fns";
import api from "../api/posts";
import useAxiosFetch from "../hooks/useAxiosFetch";
import useWindowSize from "../hooks/useWindowSize";

const DataContext = createContext({});
// Remaining code remains unchanged...

export const DataProvider = ({ children }) => {
  const [posts, setPost] = useState([]);
  const [search, setSearch] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPost(data);
  }, [data]);

  // Search filter logic
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchRes(filteredResults); // Update the filtered results
  }, [posts, search]);

  // Handle post submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { title: postTitle, datetime, body: postBody };

    try {
      const response = await api.post("/posts", newPost);
      setPost([...posts, response.data]);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err.message);
    }
  };

  // Handle post editing
  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };

    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPost(posts.map((post) => (post.id === id ? response.data : post)));
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.error("Error editing post:", err.message);
    }
  };

  // Handle post deletion
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPost(posts.filter((post) => post.id !== id));
      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err.message);
    }
  };
  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchRes,
        fetchError,
        isLoading,
        handleSubmit,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        posts,
        handleEdit,
        editBody,
        setEditBody,
        editTitle,
        setEditTitle,
        handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
