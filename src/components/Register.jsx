// Register.js
import React, { useState } from "react";
import axios from "axios";

const Register = ({ setUser, setIsRegistered }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!/^(?=.*[A-Za-z])(?=.*\d{2})[A-Za-z\d]{3,}$/.test(formData.username)) {
            newErrors.username = "Le nom d'utilisateur doit contenir au moins une lettre et deux chiffres.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
  

    const handleRegister = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                await axios.post("http://localhost:5000/register", {
                    nomUtilisateur: formData.username,
                    motDePasse: formData.password,
                });
                setUser(formData.username);
                setIsRegistered(true);
            } catch (error) {
                console.error("Erreur d'enregistrement :", error.message);
            }
        }
    };

    return (
        <div>
            <h2>Créer un compte</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Nom d'utilisateur"
                    required
                />
                {errors.username && <p className="error">{errors.username}</p>}

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Mot de passe"
                    required
                />

                <button type="submit">S'inscrire</button>
            </form>
            <p>Vous avez déjà un compte? <button onClick={() => setIsRegistered(true)}>Connectez-vous ici</button></p>
        </div>
    );
};

export default Register;
