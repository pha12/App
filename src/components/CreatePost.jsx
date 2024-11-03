import { useRef, useState } from "react";
import "../App.css";

const CreatePost = ({ addPost, user }) => { 
    const [content, setContent] = useState("");
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaPreview, setMediaPreview] = useState(null); // For showing media preview
    const contentRef = useRef();

    // Helper function to check if content is a link
    const isLink = (text) => {
        const urlPattern = /^(https?:\/\/[^\s]+)$/i;
        return urlPattern.test(text);
    };

    // Detect content type based on the uploaded file or content input
    const detectContentType = () => {
        if (mediaFile) {
            const fileType = mediaFile.type;
            if (fileType.startsWith("image/")) return "image";
            if (fileType.startsWith("video/")) return "video";
            if (fileType === "application/pdf" || fileType.startsWith("application/msword")) return "document";
        }
        if (isLink(content)) return "link";
        if (content) return "text";
        return null;
    };

    // Handle file change to display a media preview
    const handleMediaChange = (event) => {
        const file = event.target.files[0];
        setMediaFile(file);
        
        // Generate preview URL if the file is an image or video
        if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
            const previewUrl = URL.createObjectURL(file);
            setMediaPreview(previewUrl);
        } else {
            setMediaPreview(null); // Reset preview if the file is not image/video
        }
    };

    // Handle submit to create a new post
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const contentType = detectContentType();

        if (!contentType) {
            alert("Veuillez ajouter du contenu avant de publier !");
            return;
        }

        addPost(content, mediaFile); // Use addPost function to add the new post

        // Reset fields after posting
        setContent("");
        setMediaFile(null);
        setMediaPreview(null);
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
                        accept="image/*,video/*,.pdf,.doc,.docx"
                        onChange={handleMediaChange}
                        className="file-input"
                    />
                </div>

                {/* Preview section for media */}
                {mediaPreview && (
                    <div className="media-preview">
                        {mediaFile.type.startsWith("image/") ? (
                            <img src={mediaPreview} alt="Prévisualisation" className="preview-image" />
                        ) : (
                            <video controls src={mediaPreview} className="preview-video" />
                        )}
                    </div>
                )}

                <button type="submit">Partager</button>
            </form>
        </div>
    ); 
};

export default CreatePost;
