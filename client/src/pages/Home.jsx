import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);
 
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

 {/*
    Conteneur de messages 
    *********************

    Pour chaque message, on va retourner les détails 
    ************************************************
    On utilise ".map()", on donne une clé unique, qui est l'identifiant de post, tous les identifiants sont différents, on peut les utiliser et à l'intérieur de la div, on aura un conteneur d'image qui va inclure l'image, et on aura un contenu. Cela va inclure le titre et la description.
  */}

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          /* Récupération de la publication par l'id  */
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              {/* Récupération du titre de la publication */}
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
               {/* Récupération de la description de la publication */}
              <p>{getText(post.desc)}</p>
              <Link to={`/post/${post.id}`}> {/* Link to the post's details page */}
                <button>Lire plus</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;