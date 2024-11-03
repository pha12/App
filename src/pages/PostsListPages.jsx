import React from "react";

const PostsListPages = ({ posts, likePost, addComment, currentUser }) => {
    return (
        <div className="posts-list-pages">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="post-item">
                        <p><strong>{post.postOwner}</strong></p>
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
                                <p key={idx}><strong>{comment.user} :</strong> {comment.text}</p>
                            ))}
                            
                            <input
                                type="text"
                                placeholder="Ajouter un commentaire..."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && e.target.value.trim() !== "") {
                                        addComment(post.id, e.target.value);
                                        e.target.value = "";
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

export default PostsListPages;
