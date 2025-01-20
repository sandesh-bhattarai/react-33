import { Avatar } from "flowbite-react";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import chatSvc from "./chat.service";
import socket from "../../config/socket.config";
import AuthContext from "../../context/auth.context";

const ChatListPage = () => {
  const [users, setUsers] = useState();
  const [messages, setMessages] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [currentMessage, setCurrentMessage] = useState();

  const { user } = useContext(AuthContext);

  const getChatList = useCallback(async () => {
    try {
      const res = await chatSvc.userLists();
      setUsers(res.data.data);
    } catch (exception) {
      toast.error("Error loading users");
      console.log(exception);
    }
  }, []);

  const getChatDetail = useCallback(async (userId) => {
    try {
      let response = await chatSvc.getChatDetail(userId);
      setMessages(response.data.data);
    } catch (exception) {
      toast.error("Error loading chat");
      console.log(exception);
    }
  }, []);

  const submitChat = async () => {
    try {
      const res = await chatSvc.sendChatMessage({
        message: currentMessage,
        receiver: currentUser._id,
      });
      toast.success("Message Sent");
      messageSend();
      getChatDetail(currentUser._id);
    } catch (exception) {
      toast.error("Error sending chat");
      console.log(exception);
    }
  };

  useEffect(() => {
    getChatList();
  }, []);

  const messageSend = () => {
    socket.emit("newMessage", { sender: user._id, reciver: currentUser._id });
  };

  const notifyAndLoadMessage = (data) => {
    if (data.receiver === user._id) {
      getChatDetail(data.sender);
    }
  };

  useEffect(() => {
    socket.connect();

    const onConnect = () => {
      // handle
      // console.log("Socker is connected");
    };
    socket.on("connect", onConnect);
    socket.on("messageReceived", notifyAndLoadMessage);
    // socket.on("hello", (data) => {
    //   console.log("hello", data);
    // });

    return () => {
      socket.off("connect", onConnect);
      socket.off("messageReceived", notifyAndLoadMessage);
    };
  }, []);
  //

  // setInterval(() => {
  //   getChatDetail(currentUser._id)
  // },1000)
  return (
    <>
      <div className="flex h-auto">
        <div className="w-1/4 bg-gray-700 text-white p-4">
          <h2 className="text-xl font-bold mb-4">Chat Users</h2>

          {users &&
            users.map((user, index) => (
              <li
                onClick={(e) => {
                  console.log(user);
                  getChatDetail(user._id);
                  setCurrentUser(user);
                }}
                key={index}
                className="p-2 mb-2 shadow-lg bg-gray-800 hover:bg-gray-600 cursor-pointer flex items-center"
              >
                <Avatar img={user.image} rounded={true} className="mr-3" />
                <div>
                  <p className="font-bold">{user.username}</p>
                  <p className="text-sm">{user.email}</p>
                  <p className="text-xs text-gray-400">{user.role}</p>
                </div>
              </li>
            ))}
        </div>
        <div className="w-3/4 bg-white p-4">
          <h2 className="text-xl font-bold mb-4">Chat Detail</h2>
          {messages && messages.length > 0 ? (
            <div className="flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 my-2 rounded-lg ${
                      msg.sender._id === user._id
                        ? "bg-blue-500 text-white self-end"
                        : "bg-gray-200 text-black self-start"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center h-[400px] text-gray-500">
              No messages yet
            </p>
          )}
          {currentUser ? (
            <>
              <div className="mt-4 flex">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-l-lg"
                  placeholder="Type your message..."
                  onChange={(e) => {
                    setCurrentMessage(e.target.value);
                  }}
                  // Add state and onChange handler for input
                />
                <button
                  className="p-2 bg-blue-500 text-white rounded-r-lg"
                  // Add onClick handler to send message
                  onClick={submitChat}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatListPage;
