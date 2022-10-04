import { createContext, useState } from "react";
import { io } from "socket.io-client";

export const Store = createContext();
export const socket = io("http://localhost:5000");

const StoreProvider = ({ children }) => {
    const [friends, setFriends] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [conversationId, setConversationId] = useState("");
    const [messages, setMessages] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const value = { friends, setFriends, currentUser, setCurrentUser, conversationId, setConversationId, messages, setMessages, isChatOpen, setIsChatOpen };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};

export default StoreProvider;