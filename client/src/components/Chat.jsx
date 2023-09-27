import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => console.log(data));
  }, [socket]);

  const getTime = () => new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();

  const sendMessage = async () => {
    if (text === "") return;
    const messageData = { room, author: username, message: text, time: getTime() };
    console.log(messageData);
    await socket.emit("send_message", messageData);
  };

  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input type="text" onChange={(e) => setText(e.target.value)} />
        <button onClick={sendMessage}>Enter</button>
      </div>
    </div>
  );
}

export default Chat;
