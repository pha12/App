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
                userProfile: { ...state.userProfile, name: action.payload },
            };
        case "LOGOUT":
            return { ...state, user: "", isRegistered: false };
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
    const [isPageView, setIsPageView] = useState(false);

    const handleLogin = (username) => dispatch({ type: "LOGIN", payload: username });
    const handleLogout = () => dispatch({ type: "LOGOUT" });
    const handleRegister = () => dispatch({ type: "REGISTER" });
    const handleProfileUpdate = (field, value) => dispatch({ type: "UPDATE_PROFILE", field, value });

    const addPost = (content, mediaFile) => {
        if (!content && !mediaFile) {
            alert("Veuillez ajouter du contenu avant de publier !");
            return;
        }

        const newPost = {
            id: Date.now(),
            content,
            mediaFile: mediaFile ? URL.createObjectURL(mediaFile) : null,
            contentType: mediaFile ? (mediaFile.type.startsWith("image") ? "image" : "video") : "text",
            likes: 0,
            comments: [],
            postOwner: state.user,
        };
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    const addComment = (postId, comment) => {
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
                    <ProfileHeader userProfile={state.userProfile} isCurrentUser={true} onProfileUpdate={handleProfileUpdate} />
                    <button onClick={() => setIsPageView(!isPageView)}>
                        {isPageView ? "Retour à la Timeline" : "Voir les Pages et Groupes"}
                    </button>

                    {isPageView ? (
                        <div>
                            <CreatePageOrGroup />
                            <PagesAndGroupsList pagesAndGroups={[]} onItemClick={() => {}} />
                        </div>
                    ) : (
                        <>
                            <CreatePost user={state.user} addPost={addPost} />
                            <PostList
                                posts={posts}
                                currentUser={state.user}
                                likePost={() => {}}
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
