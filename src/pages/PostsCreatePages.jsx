import React, { useState } from "react";

const PostsCreatePages = ({ addPost, itemId }) => {
    const [content, setContent] = useState("");
    const [mediaFile, setMediaFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content) {
            alert("Le contenu est requis pour le post.");
            return;
        }
        addPost(content, mediaFile, itemId);
        setContent("");
        setMediaFile(null);
    };

    return (
        <div className="posts-create-pages">
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Écrivez quelque chose..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => setMediaFile(e.target.files[0])}
                />
                <button type="submit">Publier</button>
            </form>
        </div>
    );
};

export default PostsCreatePages;
