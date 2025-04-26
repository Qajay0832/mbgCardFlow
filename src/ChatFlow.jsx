import React, { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./Cards";

const ChatFlow = () => {
  const items = useSelector((state) => state.custom.items);
  const [selectedFlow, setSelectedFlow] = useState(null);
  console.log("chat:", items);
  useEffect(() => {
    console.log("selectedFlow:", selectedFlow);
  }, [selectedFlow]);
//   console.log("current", selectedFlow.data.nodes[0]);


  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <Link to="/">Create Flow</Link>
      <div
        className={`w-full md:w-1/3 bg-white border-r border-gray-300 flex flex-col transition-all duration-300 ${
          true ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="p-3">
          {/* <input
            type="text"
            placeholder="Search chats"
            className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
        </div>

        <div className="flex-1 overflow-y-auto h-[calc(100vh-5rem)]">
          {items.map((flow, i) => (
            <div
              key={i}
              className="px-4 py-3 border-b border-gray-100 hover:bg-blue-50 transition cursor-pointer"
              onClick={() => setSelectedFlow(flow)}
            >
              <div className="font-semibold text-gray-800">{flow.name}</div>
              <div className="text-sm text-gray-500 truncate">
                Send a Message !
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div
        className={`flex-1 flex flex-col relative overflow-hidden transition-all duration-300 ${
          true ? "flex" : "hidden md:flex"
        }`}
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500"></div>

        {true ? (
          <>
            <div className="relative z-10 bg-blue-600 text-white px-4 py-3 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <button
                  className="md:hidden"
                  //   onClick={() => setSelectedFriend(null)}
                >
                  {/* <ArrowLeft className="w-5 h-5" /> */}
                </button>
                <div>
                  <div className="font-semibold text-base md:text-lg">
                    {/* {selectedFlow.name} */}
                  </div>
                  <div className="text-sm text-blue-100">Online</div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4">
              {selectedFlow&&<Cards data={selectedFlow}/>}
            </div>

            <div className="relative z-10 p-3 bg-white border-t border-gray-300 flex items-center gap-2 shadow-inner">
              <input
                type="text"
                placeholder="Type a message"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                // value={chatMessage}
                // onChange={(e) => setChatMessage(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-500 transition cursor-pointer shadow-sm"
                // onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">
              Welcome to coolChats
            </h2>
            <p className="text-blue-700">
              Send your first message by selecting a chat!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatFlow;
