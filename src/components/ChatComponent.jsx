import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatComponent = ({ currentUser, otherUser }) => {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [showGifModal, setShowGifModal] = useState(false);
    const [gifSearchQuery, setGifSearchQuery] = useState('');
    const [gifResults, setGifResults] = useState([]);

    useEffect(() => {
        // Load previous messages from the server for currentUser and otherUser
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const response = await axios.get(`/api/chat/${currentUser}/${otherUser}`);
            setMessages(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des messages :', error);
        }
    };

    const handleSendMessage = async () => {
        if (messageText.trim()) {
            const newMessage = {
                sender: currentUser,
                receiver: otherUser,
                text: messageText,
                type: 'text',
                timestamp: new Date(),
            };
            try {
                // Save message to server
                await axios.post('/api/chat', newMessage);
                setMessages([...messages, newMessage]);
                setMessageText('');
            } catch (error) {
                console.error('Erreur lors de l\'envoi du message :', error);
            }
        }
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const newMessage = {
                    sender: currentUser,
                    receiver: otherUser,
                    text: e.target.result,
                    type: 'media',
                    timestamp: new Date(),
                };
                setMessages([...messages, newMessage]);
            };
            reader.readAsDataURL(file);
        }
    };

    const searchGifs = async () => {
        if (gifSearchQuery.length > 0) {
            try {
                const response = await axios.get(`https://api.tenor.com/v1/search`, {
                    params: {
                        q: gifSearchQuery,
                        key: 'YOUR_TENOR_API_KEY',
                        limit: 10
                    }
                });
                setGifResults(response.data.results);
            } catch (error) {
                console.error('Erreur lors de la recherche de GIFs :', error);
            }
        }
    };

    const handleGifSelect = (gifUrl) => {
        const newMessage = {
            sender: currentUser,
            receiver: otherUser,
            text: gifUrl,
            type: 'gif',
            timestamp: new Date(),
        };
        setMessages([...messages, newMessage]);
        setShowGifModal(false);
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <span>Discussion entre {currentUser} et {otherUser}</span>
            </div>

            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender === currentUser ? 'user' : 'other'}`}>
                        {message.type === 'text' && <span>{message.text}</span>}
                        {message.type === 'media' && <img src={message.text} alt="Media" style={{ maxWidth: '100%' }} />}
                        {message.type === 'gif' && <img src={message.text} alt="GIF" style={{ maxWidth: '100%' }} />}
                        <small className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</small>
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="file"
                    accept="image/*,video/*"
                    style={{ display: 'none' }}
                    id="fileInput"
                    onChange={handleFileChange}
                />
                <button onClick={() => document.getElementById('fileInput').click()}>
                    <img src="path/to/image/icon.png" alt="Image" /> {/* Image upload icon */}
                </button>
                <button onClick={() => setShowGifModal(true)}>GIF</button>
                <input
                    type="text"
                    placeholder="Rédigez un message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Envoyer</button>
            </div>

            {showGifModal && (
                <div className="gif-modal">
                    <div className="gif-modal-content">
                        <span className="close" onClick={() => setShowGifModal(false)}>&times;</span>
                        <input
                            type="text"
                            placeholder="Rechercher des GIFs..."
                            value={gifSearchQuery}
                            onChange={(e) => setGifSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && searchGifs()}
                        />
                        <div className="gif-results">
                            {gifResults.map((gif, index) => (
                                <img
                                    key={index}
                                    src={gif.media[0].gif.url}
                                    alt="GIF"
                                    onClick={() => handleGifSelect(gif.media[0].gif.url)}
                                    style={{ width: '100px', cursor: 'pointer' }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatComponent;

