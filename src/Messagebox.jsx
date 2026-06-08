import React, { useEffect, useState, useRef } from 'react';
import { ref, onValue, push, set, serverTimestamp } from "firebase/database"; 
import { auth, database, Usernameprint, onAuthStateChanged } from "./DB/Firebaseconfig"; 

function Messagebox() { // App.jsx ile prop uyumluluğu sağlandı
  const [currentUserState, setCurrentUserState] = useState(null);
  const [username, setusername] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserState(user);
        Usernameprint().then((userData) => {
          if (userData && userData.username) {
            setusername(userData.username);
          }
        });
      } else {
        setCurrentUserState(null);
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!currentUserState) return;
    const usersRef = ref(database, "public_profiles");
    
    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const usersArray = Object.keys(data).map((key) => ({
          uid: key,
          ...data[key]
        }));
        setRegisteredUsers(usersArray);
      } else {
        setRegisteredUsers([]);
      }
      setLoading(false); 
    }, (error) => {
      setLoading(false);
    });
    return () => unsubscribeUsers();
  }, [currentUserState]);

  useEffect(() => {
    if (!currentUserState || !selectedUser) {
      setMessageList([]);
      return;
    }

    const chatRoomId = currentUserState.uid < selectedUser.uid 
      ? `${currentUserState.uid}_${selectedUser.uid}` 
      : `${selectedUser.uid}_${currentUserState.uid}`;

    const chatRef = ref(database, `chats/${chatRoomId}/messages`);

    const unsubscribeChat = onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const msgArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setMessageList(msgArray);
      } else {
        setMessageList([]);
      }
    }, (error) => {
      console.error(error);
    });

    return () => unsubscribeChat();
  }, [currentUserState, selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  const sendmessage = (e) => {
    if (e.keyCode === 13 || e.type === "click") {
      if (message.trim().length > 0 && currentUserState && selectedUser) {
        
        const chatRoomId = currentUserState.uid < selectedUser.uid 
          ? `${currentUserState.uid}_${selectedUser.uid}` 
          : `${selectedUser.uid}_${currentUserState.uid}`;

        const chatRef = ref(database, `chats/${chatRoomId}/messages`);
        const newMsgRef = push(chatRef);

        set(newMsgRef, {
          senderId: currentUserState.uid,
          text: message.trim(),
          timestamp: serverTimestamp()
        }).then(() => {
          setMessage("");
        }).catch((err) => {
          console.error(err);
        });
      }
    }
  };

  const getUserNameFromId = (senderId) => {
    const foundUser = registeredUsers.find(u => u.uid === senderId);
    return foundUser ? foundUser.username : "Anonim";
  };

  return (
    <div className='MessageBox-container'>
      <div className="Userscontainer">
        <ul className='Activeuserlist'>
          {loading ? (
            <li className="Activeuser">Kullanıcılar yükleniyor...</li>
          ) : registeredUsers.length === 0 ? (
            <li className="Activeuser">Kayıtlı hiçbir kullanıcı bulunamadı.</li>
          ) : (
            registeredUsers.map((userItem) => (
              <li 
                key={userItem.uid} 
                onClick={() => setSelectedUser(userItem)}
                className={`Activeuser ${selectedUser?.uid === userItem.uid ? "selected-user-active" : ""} ${userItem.uid === currentUserState?.uid ? "current-user-identity" : ""}`}
              >
                <div className='User-link-wrapper'>
                  <div className='Profileinfo'>
                    <div className="premium-avatar-mini">
                      {userItem.username ? userItem.username.charAt(0).toUpperCase() : "?"}
                    </div>
                    <span className='Username'>
                      {userItem.username} {userItem.uid === currentUserState?.uid && " (Sen)"}
                    </span>
                  </div>
                  <span className='Onlinecheck'>🟢</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="Messagecontainer">
        {selectedUser ? (
          <div key={selectedUser.uid} className="active-chat-panel" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <div className="chat-header-premium">
              <h4>{selectedUser.username} ile sohbet ediyorsun</h4>
            </div>

            <div className='Messagewrapper'>
              <ul className='Messagelistwrapper'>
                {messageList.length === 0 ? (
                  <li className="no-message-placeholder">Henüz bir mesaj yok. İlk mesajı sen gönder!</li>
                ) : (
                  messageList.map((msg) => (
                    <li 
                      key={msg.id} 
                      className={`MMessage ${msg.senderId === currentUserState?.uid ? "my-own-message" : "incoming-message"}`}
                    >
                      <div className="message-bubble-wrapper">
                        <span className='Username'>{getUserNameFromId(msg.senderId)}</span>
                        <div className="messageitembox">
                          <span className='MMessageitem'>{msg.text}</span>
                        </div>
                      </div>
                    </li>
                  ))
                )}
                <div ref={messagesEndRef} />
              </ul>
            </div>

            <div className='inputcontainer'>
              <input 
                value={message} 
                onKeyDown={sendmessage} 
                onChange={(e) => setMessage(e.target.value)} 
                className='Messageinput' 
                type='text' 
                placeholder={`${selectedUser.username} kullanıcısına yaz...`} 
              />
              <button onClick={sendmessage} className='MessageSendbtn'>
                <i className="fa-solid fa-location-arrow fa-xl"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-chat-selection">
            <i className="fa-regular fa-comments fa-2xl"></i>
            <h3>HiBuddy Sohbetine Hoş Geldin</h3>
            <p>Mesajlaşmaya başlamak için sol panelden bir kullanıcı seçin.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messagebox;
