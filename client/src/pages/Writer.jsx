// Utilisés pour créer des composants Rreact et gérer l'état local dans le composant
import React, { useState, useEffect } from "react";
// Editeur de texte riche utilisé pour enregistrer et modifier un article
import ReactQuill from "react-quill";
// Fichier css qui définit le style de l'éditeur de texte
import "react-quill/dist/quill.snow.css";
import axios from "axios";
// Pour naviguer vers d'autres pages dans l'application
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

/*
On aura 2 menus : le premier comprendra  le bouton de publication et le bouton de téléchargement d'image, et le second comprendra les catégories qu'on peut choisir 
*/
const Write = () => {
  const state = useLocation().state;
  // Géstion du contenu de l'article
  const [value, setValue] = useState(state?.title || "");
  // Géstion du titre de l'article
  const [title, setTitle] = useState(state?.desc || "");
  // Géstion du fichier image associé à l'artilce
  const [file, setFile] = useState(null);
  // Géstion de la catégorie de l'article
  const [cat, setCat] = useState(state?.cat || "");

  // Utilisé pour la navigation
  const navigate = useNavigate()

  // Géstion du téléchargement de fichiers
  const upload = async () => {
    try {
      // Création d'un objet "formData" et ajout du ficher avec la méthode "append"
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Gestion de la publication de l'article
  const handleClick = async (e) => {
    e.preventDefault();

    // Appel de la fonction "upload()" pour le téléchargement de l'image
    const imgUrl = await upload();
    
    try {
      // Requête "axios" pour la création d'un nouvel article ou la mise à jour d'un article existant en fct de la présence de "state"
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Utilisez un effet pour récupérer les données de la base de données (remplacez 'fetchDataFromDB' par la fonction appropriée)
    const fetchDataFromDB = async () => {
      try {
        const response = await axios.get(`/posts/${state.id}`); // Remplacez '/posts/${state.id}' par l'URL appropriée
        const data = response.data;
        // Mettez à jour les états avec les données de la base de données
        setValue(data.desc);
        setTitle(data.title);
        setCat(data.cat);
      } catch (error) {
        console.error(error);
      }
    };

    if (state && state.id) {
      fetchDataFromDB(); // Appel de la fonction pour récupérer les données de la base de données si state.id existe
    }
  }, [state]);


  // Formulaire de création/édition d'article
  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title} // Utilisez la valeur de 'title' comme valeur de l'input
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publier</h1>
          <span>
            <b>Status: </b> Brouillon
          </span>
          <span>
            <b>Visibilité : </b> Publique
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Télécharger image
          </label>
          <div className="buttons">
            <button>Sauver comme brouillon</button>
            <button onClick={handleClick}>Publier</button>
          </div>
        </div>
        <div className="item">
          <h1>Categorie</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
