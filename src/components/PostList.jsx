import React from "react";

const PostList = ({ posts, likePost, addComment, currentUser }) => {
    return (
        <div className="posts-list">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="post-container">
                        <p><strong>{post.postOwner || "Anonymous"}</strong></p>
                        <p>{post.content}</p>

                        {post.mediaFile && (
                            post.contentType === "image" ? (
                                <img src={post.mediaFile} alt="Post media" style={{ width: "100%" }} />
                            ) : (
                                <video controls src={post.mediaFile} style={{ width: "100%" }} />
                            )
                        )}

                        <button onClick={() => likePost(post.id)}>
                            👍 {post.likes} J'aime
                        </button>

                        <div className="comments-section">
                            {post.comments.map((comment, idx) => (
                                <p key={idx}><strong>{comment.user || "Anonymous"}:</strong> {comment.text}</p>
                            ))}

                            <input
                                type="text"
                                placeholder="Ajouter un commentaire..."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && e.target.value.trim() !== "") {
                                        addComment(post.id, { user: currentUser || "Anonymous", text: e.target.value });
                                        e.target.value = ""; // Clear the input field after submitting
                                    }
                                }}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <p>Aucun post pour le moment.</p>
            )}
        </div>
    );
};

export default PostList;
