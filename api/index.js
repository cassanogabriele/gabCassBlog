// Importation du moduel "express"
import express from "express";
// Organisation des routes de l'application dans des fichiers séparés. Imporation de fichiers depuis le répertoire "routes"
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
// Importation du module "cookie-parser" permettant de gérer les cookies de l'application "express"
import cookieParser from "cookie-parser";
// Importation du module "multer" utilisé pour gérer les téléchargements de fichier (images)
import multer from "multer";

// Création d'une instance d'express, en la stockage dans la variable "app", utilisé pour configurer les routes et gérer les requêtes HTTP
const app = express();

// Ajout d'un middleware à l'application "express" pour analyser les données JSON dans les requête entrantes, permettant de travailler avec les données JSON dans les routes de l'application
app.use(express.json());
// Ajout d'un middleware "cookieParser", utilisé pour analyser les cookies dans les requêtes HTTP
app.use(cookieParser());

// Définition d'un objet "storage" pour le middleware "multer", il spécifie où les fichiers téléchargés doivent être stockés, et comment ils doivent être nommés lorsqu'ils sont sauvegardés sur le serveur
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// Création d'une instance de "multer" en utilisation la configuration "storage" définie. Elle est utilisée pour gérer les téléchargemens de fichiers
const upload = multer({ storage });

// Configuration d'une route POST à une l'URL "/api/upload". Lorsqu'un fichier est téléchargé via cettte route, le middleware est utilsié pour gérer le téléchargement du fichier avec succès, la fonction de rappel est appellée et la réponse renvoie le nom du fichier téléchargé
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Montage des routes importées à des chemins spécifique de l'application. Les routes définies dans ces modules seront accessibles via les chemins spécifiés.
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Démarrage du servuer "express" sur le port 8800
app.listen(8800, () => {
  console.log("Connecté ");
});
