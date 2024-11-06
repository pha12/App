import React, { useState } from "react";
import axios from "axios";

const Register = ({ setUser, setIsRegistered }) => {
    const [formData, setFormData] = useState({
        appName: "",
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [serverMessage, setServerMessage] = useState("");

    const validate = () => {
        const newErrors = {};
        const usernameRegex = /^(?=.*[A-Za-z])(?=(.*\d){2})[A-Za-z\d]{3,}$/;

        if (!usernameRegex.test(formData.username)) {
            newErrors.username = "Le nom d'utilisateur doit contenir au moins une lettre et deux chiffres.";
        }
        if (formData.appName.trim() === "") {
            newErrors.appName = "Le nom de l'application est requis.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post("http://localhost:5000/register", {
                    appName: formData.appName,
                    username: formData.username,
                    password: formData.password,
                });
                setUser(formData.username);
                setIsRegistered(true);
                setServerMessage(`Inscription réussie pour l'application "${formData.appName}". Vous pouvez maintenant vous connecter.`);
                
                // Optionally reset the form fields
                setFormData({ appName: "", username: "", password: "" });
            } catch (error) {
                setServerMessage("Erreur d'enregistrement : " + error.message);
            }
        }
    };

    return (
        <div>
            <h2>Créer un compte</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="appName"
                    value={formData.appName}
                    onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                    placeholder="Nom de l'application"
                    required
                />
                {errors.appName && <p className="error">{errors.appName}</p>}

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
            {serverMessage && <p>{serverMessage}</p>}
            <p>Vous avez déjà un compte? <button onClick={() => setIsRegistered(true)}>Connectez-vous ici</button></p>
        </div>
    );
};

export default Register;
