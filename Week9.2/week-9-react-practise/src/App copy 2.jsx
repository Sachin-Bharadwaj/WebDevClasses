import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PostComponent  } from './post';
//import { set } from 'mongoose'

function App() {

  const [posts, setPosts] = useState([
    {
      name: "sachin",
      subtitle: "100 followers",
      time: "2m ago",
      image: "",
      description: "How to study in 2024"
    }
  ]);


  const PostComponents = posts.map((post) => <PostComponent
    name={post.name}
    subtitle={post.subtitle}
    time={post.time}
    image={post.image}
    description={post.description}
  />);

  function addPost() {
    setPosts([...posts, {
      name: "vishal",
      subtitle: "200 followers",
      time: "30m ago",
      image: "",
      description: "How to earn money"
    }]);
  }
  
  return (
    <div style={{background: "#dfe6e9", height: "100vh" }}>
      <button onClick={addPost}> Add Post </button>
      <div style={{display: "flex", justifyContent: "center"}}>
        <div>
          {PostComponents}
          <br />
        </div>
      </div>
    </div>
  )
}



export default App

