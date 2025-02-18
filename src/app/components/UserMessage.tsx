import { avatar } from '@/assets';
import { Message } from '@/context/messages/messageReducer';
import Image from 'next/image';
import React from 'react';

const UserMessage = ({ message }: { message: Message }) => {
  console.log(message);
  return (
    <div className="max-w-[352px] flex flex-row-reverse self-end">
      <div className="self-end">
        <Image src={avatar} width={45} height={45} priority alt="user avatar" />
      </div>
      <div className="flex-1 border-1 border border-black rounded-br-none rounded-lg p-2">
        {message?.content}
      </div>
    </div>
  );
};

export default UserMessage;
