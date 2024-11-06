import React, { useState, useRef } from "react";

const CreatePost = ({ addPost }) => { 
    const [content, setContent] = useState("");
    const [mediaFile, setMediaFile] = useState(null);
    const contentRef = useRef();

    const handleMediaChange = (event) => {
        const file = event.target.files[0];
        setMediaFile(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addPost(content, mediaFile);
        setContent("");
        setMediaFile(null);
        contentRef.current.focus();
    };

    return (
        <div className="container"> 
            <h1>Créer un post</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Contenu :</label>
                    <input 
                        type="text" 
                        placeholder="Écrivez un texte ou collez un lien"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        ref={contentRef}
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label>Télécharger un fichier :</label>
                    <input 
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleMediaChange}
                        className="file-input"
                    />
                </div>

                <button type="submit">Partager</button>
            </form>
        </div>
    ); 
};

export default CreatePost;
