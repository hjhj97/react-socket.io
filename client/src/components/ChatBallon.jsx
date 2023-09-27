import React from "react";

function ChatBallon({ msg }) {
  return (
    <div>
      <div>
        <span>{msg.author}</span> :<span>{msg.message}</span> &nbsp;
        <span>{msg.time}</span>
      </div>
    </div>
  );
}

export default ChatBallon;
