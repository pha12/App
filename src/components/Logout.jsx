// Logout.js
import React from "react";

const Logout = () => {
    return (
        <div>
            <h2>Vous êtes déconnecté</h2>
            <p>Vous avez été déconnecté avec succès.</p>
            <p>
                <a href="/">Retourner à l'accueil</a> ou{" "}
                <a href="/login">Connectez-vous à nouveau</a>
            </p>
        </div>
    );
};

export default Logout;
