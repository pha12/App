import React from "react";
import PostsCreatePages from "./PostsCreatePages";
import PostsListPages from "./PostsListPages";

const PageOrGroupView = ({ item, posts, addPost, likePost, addComment, currentUser }) => {
    return (
        <div className="page-group-view">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Type : {item.type === "page" ? "Page" : "Groupe"}</p>
            <p>Créé par : {item.creator}</p>

            {/* Formulaire pour publier un post uniquement si c'est une page publique ou un groupe */}
            {item.isPublic || item.creator === currentUser ? (
                <PostsCreatePages addPost={addPost} itemId={item.id} currentUser={currentUser} />
            ) : (
                <p>Seul le créateur peut publier des posts sur cette page privée.</p>
            )}

            {/* Liste des posts pour la page ou le groupe */}
            <PostsListPages posts={posts} likePost={likePost} addComment={addComment} currentUser={currentUser} />
        </div>
    );
};

export default PageOrGroupView;

