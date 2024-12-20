import { useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DataContext from "./context/dataContext";

const EditPost = () => {
  const { posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle } =
    useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the post based on the `id` from the URL
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    // If the post is found, populate the title and body for editing
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post) {
      handleEdit(post.id);
      navigate(`/post/${post.id}`); // Redirect to the individual post page after edit
    }
  };

  if (!post) {
    return (
      <main className="NewPost">
        <h2>Post Not Found</h2>
        <p>Well, that's disappointing.</p>
        <p>
          <Link to="/">Visit Our Homepage</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="NewPost">
      <h2>Edit Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        />
        <button type="submit" aria-label="Submit edited post">
          Submit
        </button>
      </form>
    </main>
  );
};

export default EditPost;
