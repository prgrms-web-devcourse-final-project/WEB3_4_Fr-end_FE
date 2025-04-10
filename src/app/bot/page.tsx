'use client';

import { useEffect, useState } from 'react';

export default function ChatPage() {
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. 페이지 진입 시 채팅방 생성 (또는 입장)
  useEffect(() => {
    const createOrEnterRoom = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chatBot/chat/rooms`, {
          method: 'POST',
        });

        const data = await res.json();
        console.log('✅ 채팅방 생성 응답:', data);
        const newRoomId = data?.data?.id ?? data?.id;
        if (!newRoomId) throw new Error('채팅방 ID를 찾을 수 없습니다.');

        setChatRoomId(newRoomId);
      } catch (err) {
        console.error('❌ 채팅방 생성 실패:', err);
      }
    };

    createOrEnterRoom();
  }, []);

  // 2. 메시지 전송
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatRoomId) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, `🧑: ${userMessage}`]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/chatBot/chat/rooms/${chatRoomId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage }),
      });

      const data = await res.json();
      console.log('🤖 응답:', data);
      const botMessage = data?.data?.botMessage ?? data?.botMessage ?? '응답 없음';
      setMessages((prev) => [...prev, `🤖: ${botMessage}`]);
    } catch (err) {
      console.error('❌ 메시지 전송 실패:', err);
      setMessages((prev) => [...prev, `⚠️ 메시지 전송 중 오류 발생`]);
    } finally {
      setIsLoading(false);
    }
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
