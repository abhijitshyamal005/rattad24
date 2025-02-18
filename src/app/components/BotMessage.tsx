'use client';

import { Message } from '@/context/messages/messageReducer';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { avatar } from '@/assets'; // Confirm path and export
import Markdown from 'react-markdown';
import { VolumeIcon, PauseIcon, StopCircle } from 'lucide-react';

const BotMessage = ({ message }: { message: Message }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Process the content to remove "data:" and join chunks
  const parsedContent =
    message?.content
      ?.split('\n\n') // Split by SSE chunk separator
      .map((chunk) => chunk.replace(/^data: /, '')) // Remove "data:" prefix
      .join(' ') // Join all chunks into a full sentence
      .trim() || 'Loading...'; // Fallback content

  const handlePlay = (text: string) => {
    // Cancel any ongoing speech before starting a new utterance
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();

    utterance.rate = 1.4; // Adjust speed
    utterance.voice = voices[4];
    console.log(voices);
    //Lifecycle for handling the plaing of audio
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false); // Reset state when speech finishes
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleResume = () => {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <div className="max-w-[352px] flex relative group cursor-pointer">
      <Image
        src={avatar}
        width={40}
        height={40}
        alt="Bot avatar"
        priority
        className="self-end"
      />
      <div className="ml-2 relative">
        <div className="p-4 border border-gray-300/60 rounded-t-lg rounded-tr-lg rounded-br-lg">
          {parsedContent ? <Markdown>{parsedContent}</Markdown> : 'Loading...'}
        </div>
      </div>
      <button className="absolute right-0 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isPlaying ? (
          <PauseIcon
            onClick={handlePause} // Pause speech
            className="cursor-pointer size-5"
          />
        ) : isPaused ? (
          <VolumeIcon
            onClick={handleResume} // Resume speech
            className="cursor-pointer size-5"
          />
        ) : (
          <VolumeIcon
            onClick={() => handlePlay(parsedContent)} // Play speech
            className="cursor-pointer size-5"
          />
        )}
      </button>
      {isPlaying || isPaused ? (
        <button
          className="absolute right-10 bottom-2 opacity-100 transition-opacity duration-200 text-sm "
          onClick={handleStop} // Stop speech
        >
          <StopCircle />
        </button>
      ) : null}
    </div>
  );
};

export default BotMessage;
