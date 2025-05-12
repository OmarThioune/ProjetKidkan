import React from "react";
import "./Accueil.css";

const menuItems = [
  { label: "Accueil", link: "/" },
  { label: "Profil", link: "/recherche" },
  { label: "Authentification", link: "/profile" },
  { label: "Activité", link: "/activite" },
  { label: "Ajouter", link: "/ajouter" },
  { label: "Ajouter Activité", link: "/ajouterActivite" },
  { label: "À propos", link: "/apropos" },
  { label: "Connexion", link: "/login" },
  { label: "Instance", link: "/instance" },
  { label: "Sub", link: "/sub" },
];

const Accueil = () => {
  return (
    <div className="accueil-container">
      <div className="accueil-menu">
        <h1 className="accueil-title">Bienvenue sur KidKan</h1>
        <ul className="accueil-liste">
          {menuItems.map((item, index) => (
            <li key={index} className="accueil-element">
              <a href={item.link}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accueil;
