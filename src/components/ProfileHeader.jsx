import React, { useState, useEffect } from "react";
import ChatComponent from "./ChatComponent"; // Import ChatComponent
import "../App.css";

const ProfileHeader = ({ userProfile = {}, isCurrentUser, onProfileUpdate }) => {
    const [editing, setEditing] = useState(false);
    const [showChat, setShowChat] = useState(false);
    const [profileData, setProfileData] = useState({
        backgroundImage: userProfile.backgroundImage || "default-bg.jpg",
        profilePicture: userProfile.profilePicture || "default-profile.jpg",
        name: userProfile.name || "Utilisateur",
        role: userProfile.role || "",
        company: userProfile.company || "",
        education: userProfile.education || "",
        connections: userProfile.connections || "0 abonnés - 0 relations",
    });

    // Exemple de publications (vous pouvez remplacer ceci par des données réelles)
    const [posts, setPosts] = useState([
        { id: 1, user: profileData.name, content: "Post 1", likes: 5 },
        { id: 2, user: profileData.name, content: "Post 2", likes: 3 },
        { id: 3, user: "Autre Utilisateur", content: "Post 3", likes: 10 }
    ]);

    // Calcul du total des likes des publications de l'utilisateur actuel
    const totalLikes = posts
        .filter(post => post.user === profileData.name)
        .reduce((acc, post) => acc + post.likes, 0);

    useEffect(() => {
        setProfileData({
            backgroundImage: userProfile.backgroundImage || "default-bg.jpg",
            profilePicture: userProfile.profilePicture || "default-profile.jpg",
            name: userProfile.name || "Utilisateur",
            role: userProfile.role || "",
            company: userProfile.company || "",
            education: userProfile.education || "",
            connections: userProfile.connections || "0 abonnés - 0 relations",
        });
    }, [userProfile]);

    const toggleEdit = () => setEditing(!editing);

    const handleInputChange = (field, value) => {
        setProfileData({ ...profileData, [field]: value });
        onProfileUpdate(field, value);
    };

    const handleFileChange = (field, e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileData((prevData) => ({ ...prevData, [field]: imageUrl }));
            onProfileUpdate(field, imageUrl);
        }
    };

    return (
        <div className="profile-header">
            <div
                className="background-image"
                style={{ backgroundImage: `url(${profileData.backgroundImage})` }}
            >
                {isCurrentUser && (
                    <>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange("backgroundImage", e)}
                            style={{ display: "none" }}
                            id="background-upload"
                        />
                        <label htmlFor="background-upload" className="edit-background">
                            Modifier l'image d'arrière-plan
                        </label>
                    </>
                )}
            </div>

            <div className="profile-info">
                <div className="profile-picture-container">
                    <img src={profileData.profilePicture} alt={profileData.name} className="profile-picture" />
                    {isCurrentUser && (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange("profilePicture", e)}
                                style={{ display: "none" }}
                                id="profile-picture-upload"
                            />
                            <label htmlFor="profile-picture-upload" className="edit-profile-picture">
                                Modifier la photo de profil
                            </label>
                        </>
                    )}
                </div>

                {editing ? (
                    <div className="editable-fields">
                        <input
                            type="text"
                            value={profileData.name}
                            placeholder="Nom"
                            onChange={(e) => handleInputChange("name", e.target.value)}
                        />
                        <input
                            type="text"
                            value={profileData.role}
                            placeholder="Rôle"
                            onChange={(e) => handleInputChange("role", e.target.value)}
                        />
                        <input
                            type="text"
                            value={profileData.company}
                            placeholder="Entreprise"
                            onChange={(e) => handleInputChange("company", e.target.value)}
                        />
                        <input
                            type="text"
                            value={profileData.education}
                            placeholder="Éducation"
                            onChange={(e) => handleInputChange("education", e.target.value)}
                        />
                    </div>
                ) : (
                    <div>
                        <h1>{profileData.name}</h1>
                        <p>{profileData.role || "Rôle non spécifié"}</p>
                        <p className="company">{profileData.company || "Entreprise non spécifiée"}</p>
                        <p className="education">{profileData.education || "Éducation non spécifiée"}</p>
                        <p className="connections">{profileData.connections}</p>
                        <p className="likes">Total des likes : {totalLikes}</p>
                    </div>
                )}

                {isCurrentUser && (
                    <div className="profile-actions">
                        <button onClick={toggleEdit} className="action-button">
                            {editing ? "Enregistrer le profil" : "Modifier le profil"}
                        </button>
                        <button className="action-button">Vérifier maintenant</button>
                        <button onClick={() => setShowChat(true)} className="chat-button">💬 Chat</button>
                    </div>
                )}

                {showChat && (
                    <ChatComponent isCurrentUser={profileData.name} /> // Pass the current user name to the ChatComponent
                )}
            </div>

            <div className="profile-objectives">
                <h3>Mes objectifs</h3>
                <p>
                    À l’écoute de nouvelles opportunités : Cartographe, Développeur web, Développeur applications,
                    Ingénieur logiciels et Designer Web
                </p>
            </div>
        </div>
    );
};

export default ProfileHeader;

