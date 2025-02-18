import { avatar } from '@/assets';
import Image from 'next/image';
import React from 'react';

const DefaultBotMessage = () => {
  return (
    <div className="max-w-[352px] flex">
      <Image
        src={avatar}
        width={40}
        height={40}
        alt="Avatart"
        priority
        className="self-end"
      />
      <div className="">
        <div className=" p-4 border-1 border-black/70 text-black rounded-lg rounded-bl-none border">
          Welcome to simplecx! I am ready to guid you through integration of our
          AI Agent!
        </div>
      </div>
    </div>
  );
};

export default DefaultBotMessage;
