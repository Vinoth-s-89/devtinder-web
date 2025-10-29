import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiPaths, appApi } from "../utils/api";
import { defaultUrl, icons } from "../utils/constants";
import { routePaths } from "../utils/routes";
import { useSelector } from "react-redux";

const messages = [
  "You were the Chosen One!",
  "I hate you!",
  "You were the Chosen One!",
  "I hate you!",
  "You were the Chosen One!",
  "I hate you!",
  "You were the Chosen One!",
  "I hate you!",
  "You were the Chosen One!",
  "I hate you!",
];

const Chat = () => {
  const [userDetail, setUserDetails] = useState(null);
  const { userId = "" } = useParams();
  const inputRef = useRef(null);
  const user = useSelector((state) => state.user);

  const fetchUserDetails = async () => {
    try {
      const { data } = await appApi.get(`${apiPaths.userDetail}/${userId}`);
      setUserDetails(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

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
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`chat ${isEven ? "chat-end" : "chat-start"} mb-4`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={
                          isEven
                            ? user.profileUrl
                            : userDetail?.profileUrl || defaultUrl
                        }
                      />
                    </div>
                  </div>
                  <div
                    className={`chat-bubble ${
                      isEven ? "bg-gray-500" : "bg-gray-800"
                    }`}
                  >
                    {message}
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
          />
          <div className="bg-primary h-12 aspect-square fill-white rounded-lg p-2 cursor-pointer">
            {icons.sendMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
