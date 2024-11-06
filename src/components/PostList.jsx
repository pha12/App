import React from "react";
import Post from "./Post";

const PostList = ({ posts, likePost, addComment, currentUser }) => {
    return (
        <div className="posts-list">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Post
                        key={post.id}
                        post={post}
                        likePost={likePost}
                        addComment={addComment}
                        currentUser={currentUser}
                    />
                ))
            ) : (
                <p>Aucun post pour le moment.</p>
            )}
        </div>
    );
};

export default PostList;
