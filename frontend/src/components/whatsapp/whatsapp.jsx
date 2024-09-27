
  import React, { useState, useEffect } from 'react';
  import { MessageSquare, Send } from 'lucide-react';
  import './whatsapp.css';
  
  const WhatsAppClone = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
  
    const chats = [
      { id: 1, name: 'Lahiru Heshan', lastMessage: 'Hey, how are you?', profileImage: 'https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg' },
      { id: 2, name: 'Dinali Dahamsa', lastMessage: 'See you tomorrow!', profileImage: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg' },
      { id: 3, name: 'Ashan Perera', lastMessage: 'Did you get my email?', profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
    ];
  
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/messages');
          if (response.ok) {
            const data = await response.json();
            setMessages(data);
          } else {
            console.error('Failed to fetch messages:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
  
      fetchMessages();
    }, []);
  
    const handleSendMessage = async () => {
      if (message.trim() && selectedChat !== null) {
        const chatName = chats.find((chat) => chat.id === selectedChat)?.name;
        const newMessage = { name: chatName || 'You', message };
  
        try {
          const response = await fetch('http://localhost:5000/api/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessage),
          });
  
          if (response.ok) {
            const savedMessage = await response.json();
            setMessages((prevMessages) => [...prevMessages, savedMessage]);
          } else {
            console.error('Failed to save message:', response.statusText);
          }
        } catch (error) {
          console.error('Error sending message:', error);
        }
  
        setMessage('');
      }
    };
   

    return (
      <div className="whatsapp-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>WhatsApp <span style={{marginLeft:'190px'}}><a href='/setting'>⚙️</a></span></h2>
          </div>
          <ul className="chat-list">
            {chats.map((chat) => (
              <li 
                key={chat.id}
                className={`chat-item ${selectedChat === chat.id ? 'selected' : ''}`}
                onClick={() => setSelectedChat(chat.id)}
              >
              <div className="avatar" style={{ backgroundImage: `url(${chat.profileImage})` }}></div>
                <div className="chat-info">
                  <h3>{chat.name}</h3>
                  <p>{chat.lastMessage}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Chat Window */}
        <div className="chat-window">
          {selectedChat ? (
            <>
              <div className="chat-header">
                <h2>{chats.find((chat) => chat.id === selectedChat)?.name}</h2>
              </div>
              <div className="message-area">
                {messages.map((msg, index) => (
                  <p key={index} className={`message ${msg.name === (chats.find(chat => chat.id === selectedChat)?.name) ? 'sent' : 'received'}`}>
                    <strong>{msg.name}:</strong> {msg.message}
                  </p>
                ))}
              </div>
              <div className="input-area">
                <input
                  type="text"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>
                  <Send size={24} />
                </button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <MessageSquare size={48} />
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default WhatsAppClone;
  