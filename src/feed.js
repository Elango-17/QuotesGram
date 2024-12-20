// Feed Component
import { useContext } from "react";
import Post from "./post";
import DataContext from "./context/dataContext";

const Feed = () => {
  const { searchRes } = useContext(DataContext); // Get filtered posts from context

  return (
    <div className="feed">
      {searchRes.map((post) => (
        <Post key={post.id} post={post} /> // Pass each post to the Post component
      ))}
    </div>
  );
};

export default Feed;
