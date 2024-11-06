// Header.js
import React from "react";

const Header = ({ user, logout }) => {
    return (
        <header className="header">
            <h1>Prof-Connect</h1>
            {user ? (
                <button onClick={logout}>Déconnexion</button>
            ) : (
                <button onClick={() => alert("Please log in or register.")}>Connexion / Inscription</button>
            )}
        </header>
    );
};

export default Header;


