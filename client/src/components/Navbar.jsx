import React, { useContext } from "react";
// Importation du composant Link fournit par la bibliothèque React Router
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.jpg";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={Logo} alt="" />
          </Link>
        </div>
        {/* 
          Lien avec une route 
          *******************
          Requête permettant d'aller à la catégorie "Art"
          **********************************************
          On reste sur la page d'accueil.        
        */}
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGIE</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>NOURRITURE</h6>
          </Link>         

          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Se déconnecter</span>
          ) : (
            <Link className="link" to="/login">
              Se connecter
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/write">
              Ecrire
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
