// Importation du logo 
import React from "react";
import Logo from "../img/logo.jpg";

const Footer = () => {
  return (
    <footer>
        <div>
        Un blog en React Js et MySQL
        </div>
      <img src={Logo} alt="" />
      <span>
        Tous droits réservés @ <a href="https://gabriel-cassano.be/"><b>Gabriele Cassano</b></a>.
      </span>
    </footer>
  );
};

export default Footer;
