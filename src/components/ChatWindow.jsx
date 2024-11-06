import React, { useState } from "react";

const ChatWindow = ({ currentUser, otherUser, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSendMessage = () => {
        if (input.trim()) {
            // Ajoute un message avec l'utilisateur actuel comme expéditeur
            setMessages([...messages, { text: input, sender: currentUser }]);
            setInput("");
            
            // Simuler une réponse automatique de l'autre utilisateur
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Message reçu!", sender: otherUser },
                ]);
            }, 1000);
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h2>Discussion avec {otherUser}</h2>
                <button onClick={onClose} className="close-chat">X</button>
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender === currentUser ? 'user-message' : 'other-message'}`}>
                        <strong>{message.sender}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Écrire un message..."
                />
                <button onClick={handleSendMessage}>Envoyer</button>
            </div>
        </div>
    );
};

export default ChatWindow;
