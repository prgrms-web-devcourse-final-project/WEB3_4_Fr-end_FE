import { type GroupChat } from "@/types/Chat";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

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
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    // 필요한 경우 검색 로직을 추가하거나 상위 컴포넌트로 이벤트를 전달
  };

  return (
    /** 전체 사이드바 컨테이너:  + 세로 스크롤 전체 */
    <div className="w-80 flex flex-col rounded-2xl border border-indigo-300">
      {/* 상단 영역: 타이틀 + 검색창 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-center">채팅방 목록</h2>
        <div className="relative">
          {/* 검색 아이콘 */}
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="채팅 검색..."
            value={searchText}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white 
                       border border-gray-200  text-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       placeholder-gray-400"
          />
        </div>
      </div>

      {/* 채팅 목록 */}
      <div className="flex-1 overflow-y-auto p-4 ">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`flex items-center p-3 mb-3 rounded-lg shadow-sm bg-white
                        cursor-pointer hover:bg-gray-50 transition-colors 
                        ${
                          selectedChat?.id === chat.id
                            ? "ring-2 ring-indigo-200"
                            : ""
                        }`}
          >
            {/* 프로필 이미지 + 온라인 표시 */}
            <div className="relative w-12 h-12 mr-3">
              <Image
                src={chat.members[0].avatar}
                alt={chat.name}
                width={48}
                height={48}
                className="object-cover rounded-full"
              />
              {chat.members[0].status === "online" && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            {/* 채팅방 정보 (이름, 마지막 메시지, 시간) */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-semibold truncate">{chat.name}</h4>
                <span className="text-xs text-gray-500">{chat.timestamp}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {chat.lastMessage}
              </p>
            </div>

            {/* 안 읽은 메시지 수 */}
            {chat.unreadCount && (
              <div className="ml-3 min-w-[20px] h-5 px-2 rounded-full bg-indigo-400 text-white text-xs flex items-center justify-center">
                {chat.unreadCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
