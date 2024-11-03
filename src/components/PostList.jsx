// PostList.js
import React from "react";
import Post from "./Post";

const PostList = ({ posts, currentUser, likePost, addComment, deletePost, editPost, addReaction }) => {
    return (
        <div className="posts-list">
            {posts.map((post) => (
                <Post 
                    key={post.id} 
                    post={post} 
                    currentUser={currentUser} 
                    likePost={likePost} 
                    addComment={addComment}  
                    deletePost={deletePost} 
                    editPost={editPost} 
                    addReaction={addReaction}  
                />
            ))}
        </div>
    );
};

export default PostList;
