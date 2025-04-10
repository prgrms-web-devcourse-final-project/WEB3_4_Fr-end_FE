'use client';

import { useEffect, useState } from 'react';

export default function ChatPage() {
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 더미 ID
  useEffect(() => {
    const fakeCreateRoom = () => {
      // api 교체해야됨
      const fakeId = Math.floor(Math.random() * 1000) + 1;
      console.log(fakeId);
      setChatRoomId(fakeId);
    };

    fakeCreateRoom();
  }, []);

  // 더미 응답답
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatRoomId) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, `🧑: ${userMessage}`]);
    setInput('');
    setIsLoading(true);

    // api 교체해야됨
    setTimeout(() => {
      const fakeBotMessage = `🤖: "${userMessage}"에 대한 답변입니다.`;
      setMessages((prev) => [...prev, fakeBotMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">AI 채팅</h1>

      <div className="bg-white border rounded p-4 h-80 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2 whitespace-pre-wrap">{msg}</div>
        ))}
        {isLoading && <div className="text-gray-500 text-sm">🤖 응답 중...</div>}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-400 px-3 py-2 rounded"
          placeholder="메시지를 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          전송
        </button>
      </form>
    </div>
  );
}
