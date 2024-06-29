import React, { useContext } from "react";
import { motion } from "framer-motion";
import ChatUser from "../components/ChatUser";
import CurrentChat from "../components/CurrentChat";
import { Store } from "../context/appContext";
import { fadeInVariant } from "../styles/variants";

const Chat = () => {
  const { isChatOpen } = useContext(Store);

  return (
    <div className="mt-20 p-5">
      <motion.div
        variants={fadeInVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="border max-w-5xl mx-auto rounded-md grid grid-cols-12 gap-6"
      >
        <ChatUser />
        <div className="col-span-7 relative" style={{ height: "80vh" }}>
          {isChatOpen ? (
            <CurrentChat />
          ) : (
            <div>
              <img
                src="https://c.tenor.com/jQzK2XwJzcAAAAAM/seal-bread.gif"
                alt=""
                className="mx-auto"
              />
              <p className="font-medium text-xl my-5">
                Tap any chat to start conversation!
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;
