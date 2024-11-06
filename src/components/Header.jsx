// Header.js
import React from "react";
import '../App.css'; // Adjusted path

const Header = ({ user, logout }) => {
    return (
        <header className="header">
            <div className="logo">Prof-Connect</div>
            <nav className="nav-links">
                <a href="/home">Accueil</a>
                <a href="/network">Réseau</a>
                <a href="/jobs">Offres d’emploi</a>
                <a href="/messages">Messagerie</a>
                <a href="/notifications">Notifications</a>
            </nav>
            <div className="profile-dropdown">
                <button className="profile-button">
                    {user ? (
                        <>
                            <img 
                                src={user.profilePicture} 
                                alt={user.name} 
                                className="profile-pic" 
                            />
                            {user.name}
                        </>
                    ) : (
                        "Profil"
                    )}
                </button>
                {user && (
                    <div className="dropdown-content">
                        <a href="/profile">Voir le profil</a>
                        <button onClick={logout}>Déconnexion</button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
