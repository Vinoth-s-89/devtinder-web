import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiPaths, appApi } from "../utils/api";
import { defaultUrl, icons } from "../utils/constants";
import { routePaths } from "../utils/routes";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [chatInfo, setChatInfo] = useState({ messages: [], userDetail: {} });
  const { targetUserId = "" } = useParams();
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const socketRef = useRef(null);
  const user = useSelector((state) => state.user);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    socketRef.current.emit("sendMessage", {
      senderId: {
        _id: user._id,
        name: user.firstName + " " + user.lastName,
      },
      message: newMessage,
      targetUserId,
    });
    setNewMessage("");
  };

  const fetchChats = async () => {
    try {
      const { data } = await appApi.get(`${apiPaths.chats}/${targetUserId}`);
      setChatInfo(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (targetUserId && user._id) {
      const socket = createSocketConnection();
      socket.emit("joinChat", { targetUserId, userId: user._id });

      socket.on("messageReceived", (msg) => {
        setChatInfo((prev) => ({ ...prev, messages: [...prev.messages, msg] }));
      });
      socketRef.current = socket;
      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [targetUserId, user?.id]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [scrollRef, chatInfo.messages]);

  useEffect(() => {
    if (targetUserId) {
      fetchChats();
    }
  }, [targetUserId]);

  const { userDetail = {}, messages = [] } = chatInfo;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[60%] h-[90%] max-w-[700px] border border-gray-300 rounded-sm grid grid-rows-[auto_1fr_auto]">
        <div className="p-2.5 border-b border-b-gray-200 grid grid-cols-[24px_40px_1fr] gap-x-4.5 items-center px-2.5 select-none">
          <Link to={routePaths.connections}>
            <div className="fill-white cursor-pointer">{icons.back}</div>
          </Link>
          <img
            src={userDetail?.profileUrl || defaultUrl}
            alt="Image Not Found"
            className="aspect-square rounded-full object-cover"
          />
          <div className="text-2xl font-bold">
            {userDetail?.firstName} {userDetail?.lastName}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="w-full h-full p-3 overflow-y-auto">
            {messages.map((message, index) => {
              const isSender = message.senderId?._id === user?._id;
              return (
                <div
                  key={index}
                  className={`chat ${
                    isSender ? "chat-end" : "chat-start"
                  } mb-4`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={
                          isSender
                            ? user.profileUrl
                            : userDetail?.profileUrl || defaultUrl
                        }
                      />
                    </div>
                  </div>
                  <div
                    className={`chat-bubble ${
                      isSender ? "bg-gray-500" : "bg-gray-800"
                    }`}
                    ref={(ref) => {
                      if (index === messages?.length - 1)
                        scrollRef.current = ref;
                    }}
                  >
                    {message.message}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="py-2.5 px-4 grid grid-cols-[1fr_40px] gap-x-3 items-center border-t border-t-gray-200">
          <input
            type="text"
            className="h-12 rounded-lg outline-none border border-gray-300 px-3 text-lg"
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <div
            onClick={sendMessage}
            className="bg-primary h-12 aspect-square fill-white rounded-lg p-2 cursor-pointer"
          >
            {icons.sendMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
