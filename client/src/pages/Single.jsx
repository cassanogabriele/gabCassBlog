// Importation des dépendances : bibliothèques et modules

// Bibliothèque React pour la création de composants et Hooks pour gérer l'état et les effets
import React, { useEffect, useState } from "react";
// Importation des images pour les icônes
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
// Fonctionnalités fournies par la bibliothèque React Router pour la gestion des routes
import { Link, useLocation, useNavigate } from "react-router-dom";
// Importation du composant "Menu"
import Menu from "../components/Menu";
// Bibliothèque pour effectuer des requêtes HTTP
import axios from "axios";
// Bibliothèque pour formater les dates
import moment from "moment";
// Hook pour accéder au contexte
import { useContext } from "react";
// Contexte d'authentification importé
import { AuthContext } from "../context/authContext";
// Bibliothèque pour nettoyer et sécuriser le HTML 
import DOMPurify from "dompurify";

/*
Affichage d'une page individuelle d'article 
contenant les informations de l'article, la possibilité de modifier ou de supprimer l'article, si l'utilisateur actuel est l'autreur de l'article, et une présentation plus complète de l'article, accompagné d'une image.

Le composant "Single" renvoie un élément JSX qui représente la page individuelle de l'article. 

Le contenu de la page est divisé en 2 parties principales : 

- l'image de l'article, des informations sur l'utilisateur qui a publié l'article : nom, image de profil, des boutons de modification et de suppression de l'article s'ils sont disponible pour l'utilisateur actuel le titre de l'aricle, la description de l'article 
- Menu qui prend en charge la catéogorisation de l'article
*/

// Déclaration des constante et des états
const Single = () => {
  // Déclaration de l'état "post"", utilisé pour stocker les données de l'article qu'on va récupérer
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  // Extraction de l'id de l'article à partir de l'url (on récupère postId)
  const postId = location.pathname.split("/")[2];

  // Utilisation du contexte d'authentification
  const { currentUser } = useContext(AuthContext);

  const formatTimeSincePublication = (dateString) => {
    const currentDate = new Date();
    const publicationDate = new Date(dateString);

    const timeDifference = currentDate - publicationDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const monthsDifference = Math.floor(daysDifference / 30);

    if (monthsDifference >= 1) {
      return `${monthsDifference} mois`;
    } else {
      return `${daysDifference} jours`;
    }
  };

  /*  
  Permet de définir un effet qui sera exécuté une fois que le composant est monté, il utilise Axios pour effectuer une requête HTTP GET, pour récupérer les données de l'articles avec l'id correspondant depuis l'API. Les données sont stockées dans l'état local "post" à l'aide la fonction "setPost"
  */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  // Fonction qui gère la suppression de l'article, elle envoie une requête HTTP DELETE à l'API pour supprimer l'article d'id correspondant. Après la suppression, l'utilisateur est redirigé vers la page d'accueil
  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  // Fonction prenant une chaîne de caractères HTML en entrée et retournant le texte brut extrait du code HTML en utilisant "DOMParser"
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
        <div className="content">
          <div>
            <img src={`../upload/${post?.img}`} alt="" />
          </div>

          <div className="user">
            {post.userImg && <img
              src={`../upload/${post.userImg}`}
              alt="userImg"
            />}
            <div className="info">
              <span>Publié par {post.username}</span>
              <p>Il y a {formatTimeSincePublication(post.date)}</p>
            </div>
            {currentUser && currentUser.username === post.username && (
              <div className="edit">
                <Link to={`/write?edit=2`} state={post}>
                  <img src={Edit} alt="" />
                </Link>
                <img onClick={handleDelete} src={Delete} alt="" />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.desc),
            }}
          ></p>      </div>
      <Menu cat={post.cat}/>
    </div>
  );
};

// Exportation du composant dans d'autres partie de l'application
export default Single;
