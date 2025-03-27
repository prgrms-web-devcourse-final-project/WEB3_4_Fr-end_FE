import { GroupChat } from "../../../types/chat";
import Image from "next/image";

interface ChatSidebarProps {
  chats: GroupChat[];
  selectedChat: GroupChat | null;
  onSelectChat: (chat: GroupChat) => void;
}

export function ChatSidebar({
  chats,
  selectedChat,
  onSelectChat,
}: ChatSidebarProps) {
  return (
    <div className="w-80 border-r bg-white">
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full px-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="overflow-y-auto rounded-2xl drop-shadow-lg">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`p-4 hover:bg-gray-50 cursor-pointer ${
              selectedChat?.id === chat.id ? "bg-indigo-50" : ""
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={chat.members[0].avatar}
                    alt={chat.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                {chat.members[0].status === "online" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold truncate">
                    {chat.name}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unreadCount && (
                <div className="min-w-[20px] h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">
                  {chat.unreadCount}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
