// Post.js
import React, { useContext, useState } from "react";
import { UserContext } from "../App";

const Post = ({ post, likePost, addComment, deletePost, editPost }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newContent, setNewContent] = useState(post.content);
    const [newComment, setNewComment] = useState("");
    const currentUser = useContext(UserContext);

    // Initialisation des réactions
    const [reactions, setReactions] = useState({
        like: post.reactions?.like || 0,
        love: post.reactions?.love || 0,
        dislike: post.reactions?.dislike || 0,
        laugh: post.reactions?.laugh || 0,
        surprise: post.reactions?.surprise || 0,
    });

    const handleReaction = (reactionType) => {
        setReactions((prevReactions) => ({
            ...prevReactions,
            [reactionType]: prevReactions[reactionType] + 1,
        }));
    };

    const handleDelete = () => deletePost(post.id);
    const handleEdit = () => {
        editPost(post.id, newContent);
        setIsEditing(false);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            addComment(post.id, { user: currentUser, text: newComment });
            setNewComment("");
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

            {/* Affichage du média */}
            {post.contentType === "image" && post.mediaFile && (
                <img src={post.mediaFile} alt="Post media" className="post-image" />
            )}
            {post.contentType === "video" && post.mediaFile && (
                <video controls src={post.mediaFile} className="post-video" />
            )}

            {/* Réactions */}
            <div className="reactions">
                <button onClick={() => handleReaction("like")}>👍 Like ({reactions.like})</button>
                <button onClick={() => handleReaction("love")}>❤️ Love ({reactions.love})</button>
                <button onClick={() => handleReaction("dislike")}>👎 Dislike ({reactions.dislike})</button>
                <button onClick={() => handleReaction("laugh")}>😂 Laugh ({reactions.laugh})</button>
                <button onClick={() => handleReaction("surprise")}>😮 Surprise ({reactions.surprise})</button>
            </div>

            {/* Compteur de Réactions Totales */}
            <div className="reaction-summary">
                <p>Réactions totales : {Object.values(reactions).reduce((acc, curr) => acc + curr, 0)}</p>
            </div>

            {post.postOwner === currentUser && (
                <>
                    {isEditing ? (
                        <>
                            <button onClick={handleEdit}>Save</button>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </>
            )}

            {/* Section des Commentaires */}
            <div className="comment-section">
                <p>Total des commentaires : {post.comments.length}</p>
                {post.comments.map((comment, idx) => (
                    // Afficher le texte du commentaire en accédant aux propriétés `user` et `text`
                    <p key={idx}><strong>{comment.user}</strong>: {comment.text}</p>
                ))}
                <form onSubmit={handleCommentSubmit}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment"
                    />
                    <button type="submit">💬 Comment</button>
                </form>
            </div>
        </div>
    );
};

export default Post;
