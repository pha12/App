import React, { useState } from "react";

const Login = ({ setUser, toggleRegistration }) => { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can add logic to validate the username and password against your backend
        setUser(username); // Assuming username is valid for now
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Entrez votre nom d'utilisateur"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <button type="submit">Se connecter</button>
            </form>
            <p>Vous n'avez pas de compte? <button onClick={toggleRegistration}>Inscrivez-vous ici</button></p>
        </div>
    );
};

export default Login;


