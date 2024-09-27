import React from 'react';
import { Settings, User, Bell, Lock, Info, Home } from 'lucide-react';



import './setting.css';

const Setting = () => {
  const settingsItems = [
    { icon: <User size={24} />, text: 'Account', subtext: 'Security notifications, change number' },
    { icon: <Bell size={24} />, text: 'Notifications', subtext: 'Message, group & call tones' },
    { icon: <Lock size={24} />, text: 'Privacy', subtext: 'Block contacts, disappearing messages' },
    { icon: <Info size={24} />, text: 'About', subtext: 'App info, device info' },
  ];

  return (
    <div className="whatsapp-settings">
      <div className="settings-container">
        <header className="settings-header">
         <Home size={24} className="header-icon"></Home>
         <a href='/'>   <h1 style={{color:'white',textDecoration:'none'}}>Home</h1></a>
        </header>
        <div className="settings-content">
          <div className="profile-section">
            <div className="profile-picture"></div>
            <div className="profile-info">
              <h2>Heshan Lahiru</h2>
              <p>Hey there! I'm using WhatsApp.</p>
            </div>
          </div>
          <ul className="settings-list">
            {settingsItems.map((item, index) => (
              <li key={index} className="settings-item">
                <div className="item-icon">{item.icon}</div>
                <div className="item-content">
                  <h3>{item.text}</h3>
                  <p>{item.subtext}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Setting;