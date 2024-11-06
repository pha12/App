import React, { useContext, useState } from "react";
import { UserContext } from "../App";

const Post = ({ post, likePost, addComment, deletePost, editPost }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newContent, setNewContent] = useState(post.content);
    const [newComment, setNewComment] = useState("");
    const currentUser = useContext(UserContext);

    const handleReaction = (reactionType) => {
        likePost(post.id, reactionType); // Call likePost from props
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            addComment(post.id, { user: currentUser || "Anonymous", text: newComment });
            setNewComment(""); // Clear input after submitting
        }
    };

    return (
        <div className="post-container">
            <p><strong>{post.postOwner || "Anonymous"}</strong></p>
            {isEditing ? (
                <input
                    type="text"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                />
            ) : (
                <p>{post.content}</p>
            )}

            {post.mediaFile && (
                post.contentType === "image" ? (
                    <img src={post.mediaFile} alt="Post media" style={{ width: "100%" }} />
                ) : (
                    <video controls src={post.mediaFile} style={{ width: "100%" }} />
                )
            )}

            <div className="reactions">
                <button onClick={() => handleReaction("like")}>👍 J'aime</button>
                {/* Add other reactions if needed */}
            </div>

            {/* Comments Section */}
            <div className="comments-section">
                {post.comments.map((comment, idx) => (
                    <p key={idx}><strong>{comment.user || "Anonymous"}:</strong> {comment.text}</p>
                ))}
                <form onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Ajouter un commentaire..."
                    />
                    <button type="submit">Commenter</button>
                </form>
            </div>
        </div>
    );
};

export default Post;
