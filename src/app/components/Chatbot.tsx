'use client';
import React, { useState, useRef, useEffect } from 'react';
import { simplecx, avatar, closeButton } from '@/assets';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { SendIcon, Loader2 } from 'lucide-react';
import BotMessageSection from './BotMessageSection';
import { MessageRole } from '@/context/messages/messageReducer';

const Chatbot = () => {
  const [chatIsOpen, setChatIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    { role: MessageRole; content: string }[]
  >([]);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const promptRef = useRef<HTMLTextAreaElement>(null);

  const handleScroll = () => {
    const scrollTop = window.scrollY; // Current scroll position from the top
    const viewportHeight = window.innerHeight; // Height of the visible area
    const fullHeight = document.documentElement.scrollHeight; // Total height of the document

    // Check if the user is at the bottom of the page
    if (scrollTop + viewportHeight >= fullHeight - 10) {
      // Add a small buffer (10px) to ensure it works on various devices
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Cleanup scroll event listener
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!promptRef.current?.value.trim()) return;
    const userPrompt = promptRef.current.value.trim();

    // Add user's message to the messages list
    setMessages((prev) => [
      ...prev,
      { role: MessageRole.USER, content: userPrompt },
    ]);
    promptRef.current.value = '';

    try {
      setLoading(true);
      // Send prompt as query
      const res = await fetch(`/api/chat-stream?prompt=${userPrompt}`);

      if (!res.body) throw new Error('No response body');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      // Stream the bot's response
      let botResponse = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        botResponse += decoder.decode(value, { stream: true });

        // Update the last bot message in real-time
        setMessages((prev) => {
          const updatedMessages = [...prev];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          if (lastMessage?.role === MessageRole.BOT) {
            lastMessage.content = botResponse;
          } else {
            updatedMessages.push({
              role: MessageRole.BOT,
              content: botResponse,
            });
          }
          return updatedMessages;
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-sm:hidden fixed text-white bottom-0 right-4 w-[450px] h-[550px] bg-[#8543cd] rounded-t-[10px] z-[100] flex flex-col transition-transform ${
        chatIsOpen ? 'translate-y-0' : 'translate-y-[510px]'
      } ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <header
        onClick={() => setChatIsOpen((prev) => !prev)}
        className="h-[40px] cursor-pointer flex justify-between items-center px-4 bg-black/80 rounded-t-[10px]"
      >
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={simplecx}
          className="size-28"
          priority
          alt="Logo"
        />
        {chatIsOpen ? (
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src={closeButton}
            className="size-8 cursor-pointer"
            priority
            alt="Close Button"
          />
        ) : (
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src={avatar}
            className="size-8 cursor-pointer"
            priority
            alt="Avatar"
          />
        )}
      </header>
      <main className="flex-1 overflow-y-auto px-4 py-2">
        <BotMessageSection messages={messages} />
      </main>
      <footer className="w-full border-1 border border-black">
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center gap-2 px-4 py-2"
        >
          <Textarea
            ref={promptRef}
            className="flex-1 outline-none resize-none text-black font-inter pt-2 border-none placeholder:text-black focus:outline-none focus:border-none"
            placeholder="Ask your questions..."
          />
          <button
            disabled={loading}
            type="submit"
            className="mr-4 cursor-pointer"
          >
            {loading ? <Loader2 className="animate-spin" /> : <SendIcon />}
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Chatbot;
