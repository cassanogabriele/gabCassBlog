import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
/*
Pour ces deux pages, on n'a pas besoin d'onglets et de pied de page. Ce seront les deux composants communs aux autres pages. On va donc créer un dossier "components" dans lequel on va créer le composant navbar et le composant footer.
*/
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Writer";
import Home from "./pages/Home";
import Single from "./pages/Single";
import './style.scss';

// Mettre à jour le titre de la page avec useEffect
function App() {
  useEffect(() => {
    document.title = "";
  }, []);

  const Layout = () => {
    return (
      <>
        {/* Affiche la barre de navigation */}
        <Navbar />
         {/* 

         Utilisation du routeur Outlet 
         *****************************
         On peut créer un composant et les enfants pourront l'utiliser.
         
         */}
        <Outlet />
         {/* Affiche le pied de page */}
        <Footer />
      </>
    );
  };

  // Utilisation du fournisseur 

  /*
  On va passer le routeur, il est égal au routeur qu'on a créé et il affiche un message quand on est sur la page d'accueil. On pourra alors créer chaque lien vers chaque page qu'on désire de la même manière.
  */
  const router = createBrowserRouter([
    {
      path: "/",
      // Composant de mise en page
      element: <Layout />,
      // On écrit ses enfants
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          // On aura un id de publication spécifique 
          path: "/post/:id",
          element: <Single />,
        },
        {
          path: "/write",
          element: <Write />,
        }
      ]
    },
    /*
    On aura besoin d'une page d'enregistrement et quand on appelera cette page, on va appeler un composant"Register", il faut l'importer. On fera la même chose pour la page de connexion mais on fera ça pour toutes les pages.    
    */
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div className="app">     
      {/* Définir une classe CSS : className  */} 
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
