import { useState } from "react";
import io from "socket.io-client";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div>
      {showChat ? (
        <Chat socket={socket} username={username} room={room} />
      ) : (
        <div>
          <h3>Join A Chat</h3>
          <input type="text" placeholder="your id" onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="Room ID" onChange={(e) => setRoom(e.target.value)} />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      )}
    </div>
  );
}

export default App;
