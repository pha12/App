// App.js
import React, { useReducer, useState, createContext } from "react";
import Header from "./components/Header";
import ProfileHeader from "./components/ProfileHeader";
import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import CreatePageOrGroup from "./pages/CreatePageOrGroup";
import PagesAndGroupsList from "./pages/PagesAndGroupsList";
import PageOrGroupView from "./pages/PageOrGroupView";
import PostsCreatePages from "./pages/PostsCreatePages";
import PostsListPages from "./pages/PostsListPages";
import ChatWindow from "./components/ChatWindow";
 

export const UserContext = createContext();

const initialState = {
    user: "",
    isRegistered: false,
    userProfile: {
        name: "",
        role: "",
        company: "",
        education: "",
        connections: "No connections yet",
        backgroundImage: "default-bg.jpg",
        profilePicture: "default-profile.jpg",
        summary: "Write a brief summary to introduce yourself and your professional experience.",
        recentActivity: "No recent activity",
    },
};

const userReducer = (state, action) => {
    switch (action.type) {
        case "REGISTER":
            return { ...state, isRegistered: true };
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                userProfile: {
                    ...state.userProfile,
                    name: action.payload,
                },
            };
        case "LOGOUT":
            return { ...state, user: "" };
        case "UPDATE_PROFILE":
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    [action.field]: action.value,
                },
            };
        default:
            return state;
    }
};

const App = () => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const [posts, setPosts] = useState([]);
    const [pagesAndGroups, setPagesAndGroups] = useState([]);
    const [selectedPageOrGroup, setSelectedPageOrGroup] = useState(null);
    const [isPageView, setIsPageView] = useState(false);

    const handleLogin = (username) => dispatch({ type: "LOGIN", payload: username });
    const handleLogout = () => dispatch({ type: "LOGOUT" });
    const handleRegister = () => dispatch({ type: "REGISTER" });
    const handleProfileUpdate = (field, value) => dispatch({ type: "UPDATE_PROFILE", field, value });

    const addPost = (content, mediaFile, itemId = null) => {
        const newPost = {
            id: Date.now(),
            content,
            mediaFile: mediaFile ? URL.createObjectURL(mediaFile) : null,
            contentType: mediaFile ? (mediaFile.type.startsWith("image") ? "image" : "video") : "text",
            likes: 0,
            comments: [],
            postOwner: state.user,
            itemId,
        };
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    const addPageOrGroup = (newItem) => {
        setPagesAndGroups((prevItems) => [
            ...prevItems,
            { ...newItem, id: Date.now(), creator: state.user },
        ]);
    };

    const likePost = (postId) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, likes: post.likes + 1 } : post
            )
        );
    };

    const addComment = (postId, commentText) => {
        const comment = {
            user: state.user || "Anonymous",
            text: commentText,
        };
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId ? { ...post, comments: [...post.comments, comment] } : post
            )
        );
    };

    if (!state.user && !state.isRegistered) {
        return <Register setUser={handleLogin} setIsRegistered={handleRegister} />;
    }

    if (!state.user && state.isRegistered) {
        return <Login setUser={handleLogin} toggleRegistration={() => dispatch({ type: "REGISTER" })} />;
    }

    return (
        <UserContext.Provider value={state.user}>
            <Header user={state.user} logout={handleLogout} />
            {state.user ? (
                <>
                    <ProfileHeader
                        userProfile={state.userProfile}
                        isCurrentUser={true}
                        onProfileUpdate={handleProfileUpdate}
                    />
                    <button onClick={() => setIsPageView(!isPageView)}>
                        {isPageView ? "Retour à la Timeline" : "Voir les Pages et Groupes"}
                    </button>

                    {isPageView ? (
                        <>
                            <CreatePageOrGroup addPageOrGroup={addPageOrGroup} />
                            <PagesAndGroupsList
                                pagesAndGroups={pagesAndGroups}
                                onItemClick={setSelectedPageOrGroup}
                            />

                            {selectedPageOrGroup ? (
                                <PageOrGroupView
                                    item={selectedPageOrGroup}
                                    posts={posts.filter((post) => post.itemId === selectedPageOrGroup.id)}
                                    addPost={(content, mediaFile) => addPost(content, mediaFile, selectedPageOrGroup.id)}
                                    likePost={likePost}
                                    addComment={addComment}
                                    currentUser={state.user}
                                />
                            ) : (
                                <p>Choisissez une page ou un groupe pour voir les détails et les publications.</p>
                            )}
                        </>
                    ) : (
                        <>
                            <CreatePost user={state.user} addPost={(content, mediaFile) => addPost(content, mediaFile)} />
                            <PostList
                                posts={posts.filter((post) => post.itemId === null)}
                                currentUser={state.user}
                                likePost={likePost}
                                addComment={addComment}
                            />
                        </>
                    )}
                </>
            ) : (
                <Logout />
            )}
        </UserContext.Provider>
    );
};

export default App;
