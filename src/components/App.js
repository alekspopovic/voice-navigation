import React, { useState } from "react";
import HomePage from "./Home";
import BlogPage from "./Blog";
import NewBlogPostPage from "./NewBlogPost";
import ContactPage from "./Contact";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App() {
  const commands = [
    {
      command: ["Go to * page", "Go to *", "Open * page", "Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [redirectUrl, setRedirectUrl] = useState("");
  const pages = ["home", "blog", "new blog post", "contact"];
  const urls = {
    home: "/",
    blog: "/blog",
    "new blog post": "/blog/new",
    contact: "/contact",
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  let redirect = "";

  if (redirectUrl) {
    if (pages.includes(redirectUrl)) {
      redirect = <Redirect to={urls[redirectUrl]} />;
    } else {
      redirect = <p>Could not find page: {redirectUrl}</p>;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/blog/new">Add Blog Post</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <Route path="/" exact component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/blog" exact component={BlogPage} />
        <Route path="/blog/new" component={NewBlogPostPage} />
        <Route path="/contact" component={ContactPage} />

        {redirect}
      </BrowserRouter>

      <p id="transcript">Transcript: {transcript}</p>

      <button onClick={SpeechRecognition.startListening}>Start</button>
    </div>
  );
}

export default App;
