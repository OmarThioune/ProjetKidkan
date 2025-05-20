import React from "react";
import "./Accueil.css";
import { usePage, useForm  } from "@inertiajs/react";

const Accueil = () => {
  const { auth } = usePage().props; // ✅ Move inside component
  const isLoggedIn = !!auth.user; // Check if user is logged in
  const { post } = useForm();

  

  const menuItems = isLoggedIn
    ? [
        { label: "Accueil", link: "/dashboard" },
        //{ label: "Compte", link: "/compte" },
        { label: "Activités", link: "/activities" },
        //{ label: "Catégorie", link: "/categorie" },
        { label: "Ajouter Activité", link: "/ajouter" },
        { label: "À propos", link: "/apropos" }, // Show logout when logged in
      ]
    : [
        { label: "Accueil", link: "/" },
        { label: "Activités", link: "/activities" },
        //{ label: "Catégorie", link: "/categorie" },
        { label: "À propos", link: "/apropos" },
        { label: "Connexion", link: "/login" }, // Show login when logged out
      ];

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