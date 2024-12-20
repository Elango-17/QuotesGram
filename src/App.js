import { Routes, Route } from "react-router-dom";
import About from "./about";
import Footer from "./footer";
import Header from "./header";
import Home from "./home";
import Missing from "./missing";
import Nav from "./nav";
import NewPost from "./newPost";
import PostPage from "./postPage";
import EditPost from "./editPost";

import { DataProvider } from "./context/dataContext";

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title="QuoteGram" />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="post" element={<NewPost />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
