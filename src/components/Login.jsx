// Login.js
import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUser, toggleRegistration }) => { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Tentative de connexion avec :", username, password); // Log des valeurs de connexion
        try {
            const response = await axios.post("http://localhost:5000/login", {
                nomUtilisateur: username,
                motDePasse: password,
            });
            console.log("Réponse du serveur:", response.data); // Vérifie la réponse du serveur
            setUser(response.data.utilisateur.nomUtilisateur);
        } catch (error) {
            console.error("Erreur de connexion:", error); // Log en cas d'erreur
            setError("Nom d'utilisateur ou mot de passe incorrect.");
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input 
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Connecter</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>Pas encore de compte? <button onClick={toggleRegistration}>Inscrivez-vous ici</button></p>
        </div>
    );
};

export default Login;

