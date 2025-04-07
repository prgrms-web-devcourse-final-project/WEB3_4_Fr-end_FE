import { GroupChat } from "@/types/Chat";
import Image from "next/image";

interface ChatHeaderProps {
  chat: GroupChat;
}

export function ChatHeader({ chat }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-indigo-300 bg-white rounded-t-2xl">
      <div className="flex items-center space-x-4">
        <div className="flex -space-x-2">
          {chat.members.slice(0, 3).map((member) => (
            <div
              key={member.id}
              className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white"
            >
              <Image
                src={member.avatar}
                alt={member.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{chat.name}</h2>
          <p className="text-sm text-gray-500">
            {chat.members.map((m) => m.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
