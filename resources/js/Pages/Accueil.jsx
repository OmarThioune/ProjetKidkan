import React from "react";
import "./Accueil.css";
import { usePage } from "@inertiajs/react";

const Accueil = () => {
  const { auth } = usePage().props;
  const isLoggedIn = !!auth.user;

  const menuItems = isLoggedIn
    ? [
        { label: "Accueil", link: "/dashboard" },
        { label: "Activités", link: "/activities" },
        { label: "Ajouter Activité", link: "/ajouter" },
        { label: "À propos", link: "/apropos" },
      ]
    : [
        { label: "Accueil", link: "/" },
        { label: "Activités", link: "/activities" },
        { label: "À propos", link: "/apropos" },
        { label: "Connexion", link: "/login" },
      ];

  return (
    <div className="accueil-page">
      <header className="accueil-header">
        <h1>KidKan</h1>
        <nav>
          <ul className="accueil-nav">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.link}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="accueil-main">
        <section className="hero-section">
          <h2>Bienvenue sur KidKan</h2>
          <p>Explorez, créez et participez à des activités amusantes pour enfants !</p>
          {!isLoggedIn && (
            <a href="/register" className="cta-button">Inscrivez-vous maintenant</a>
          )}
        </section>

        <section className="features-section">
          <h3>Pourquoi choisir KidKan ?</h3>
          <div className="features-grid">
            <div className="feature-box">
              <h4>🎨 Activités variées</h4>
              <p>Des ateliers artistiques, des sports, des sorties éducatives, et bien plus encore.</p>
            </div>
            <div className="feature-box">
              <h4>👨‍👩‍👧‍👦 Pour toute la famille</h4>
              <p>Un espace pensé pour les enfants mais aussi pour les parents et organisateurs.</p>
            </div>
            <div className="feature-box">
              <h4>🔐 Espace sécurisé</h4>
              <p>Protection des données, sécurité des utilisateurs et modération des activités.</p>
            </div>
          </div>
        </section>

        <section className="temoignages-section">
          <h3>Ce que disent les parents</h3>
          <blockquote>
            “Grâce à KidKan, mes enfants découvrent de nouvelles passions chaque semaine !”<br/>
            <span>– Omar</span>
          </blockquote>
        </section>

        <section className="cta-section">
          <h3>Prêt à commencer ?</h3>
          <p>Rejoignez notre communauté et créez ou réservez des activités dès aujourd’hui.</p>
          {!isLoggedIn && (
            <a href="/login" className="cta-button">Se connecter</a>
          )}
        </section>
      </main>

      <footer className="footer">
        &copy; {new Date().getFullYear()} KidKan. Tous droits réservés.
      </footer>
    </div>
  );
};

export default Accueil;
