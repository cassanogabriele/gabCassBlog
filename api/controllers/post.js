import {db} from "../db.js";
import jwt from "jsonwebtoken";

 
/*
La fonction getPosts récupère toutes les publications de la base de données, ou les filtre par catégorie si le paramètre de requête cat est fourni. Elle utilise une requête SQL pour récupérer les données et les renvoie sous forme de réponse JSON.
*/
export const getPosts = (req, res) =>{
    const q = req.query.cat 
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";    

    db.query(q, [req.query.cat], (err, data) =>{
        if(err) return res.send(err)
        return res.status(200).json(data);
    });
}

/*
Fonction qui récupère une seule publication de la base de données en utilisant son paramètre id. Elle utilise une requête SQL pour joindre la table users avec la table posts et récupérer des informations supplémentaires sur l'utilisateur qui a créé la publication. La fonction renvoie les données de la publication sous forme de réponse JSON.
*/
export const getPost = (req, res) => {
    const q =
      "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.user_id WHERE p.id = ? ";

    console.log(q);
  
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
    
        return res.status(200).json(data[0]);
    });
};

/*
Ajout d'une post. 
*/
export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Pas connecté!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token pas valide!");
  
      const q =
        "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`user_id`) VALUES (?)";
  
      const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        req.body.date,
        userInfo.id,
      ];

      console.log(req.body.img);
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created.");
      });
    });
 };

/*
Fonction qui gère la suppression d'une publication de la base de données. Elle vérifie d'abord la présence d'un jeton d'authentification dans les cookies de la requête. Si le jeton n'est pas présent, elle renvoie une réponse JSON avec un message et un status 401, non autorisé. Sinon, elle le vérifie, à l'aide d'une clé secrète "jwtkey", en utilisation la biblioth!que JWT (JSON Web Token).
*/
export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const postId = req.params.id;
      const q = "DELETE FROM posts WHERE `id` = ? AND `user_id` = ?";
  
      db.query(q, [postId, userInfo.id], (err, data) => {
        if (err) return res.status(403).json("You can delete only your post!");
  
        return res.json("Post has been deleted!");
      });
    });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?, `desc`=?, `cat`=? " +
      (req.body.img ? ", `img`=?" : "") +
      " WHERE `id` = ? AND `user_id` = ?";

    const values = [req.body.title, req.body.desc, req.body.cat];

    // Vérfifier si on charge une image
    if (req.body.img) {
      values.push(req.body.img);
    }

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};



