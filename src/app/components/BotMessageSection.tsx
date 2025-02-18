'use client';
import React, { useRef, useEffect } from 'react';
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';
import DefaultBotMessage from './DefaultBotMessage';
import MessageContext, { Store } from '@/context/messages/MessageContext';
import { Message, MessageRole } from '@/context/messages/messageReducer';

const BotMessageSection = ({ messages }: { messages: Message[] }) => {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  // Scroll to bottom whenever messages update
  useEffect(() => {
    const container = scrollableContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // Scroll to the bottom
    }
  }, [messages]);
  return (
    <div
      ref={scrollableContainerRef}
      className="w-full h-full py-8 overflow-y-auto"
    >
      {messages.length === 0 ? (
        <DefaultBotMessage />
      ) : (
        <div className="h-full w-full flex flex-col gap-5">
          {messages.map((message, index) => {
            if (message.role === MessageRole.USER) {
              return <UserMessage key={index} message={message} />;
            } else {
              return <BotMessage key={index} message={message} />;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default BotMessageSection;
