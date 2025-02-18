'use client';
import React from 'react';
import Image from 'next/image';
import { hand } from '@/assets';
import Accordian from './_components/Accordian';
import { motion } from 'framer-motion';
const index = () => {
  return (
    <section className="h-fit bg-black text-white">
      <div className="max-w-[1352px] flex flex-col gap-16 mx-auto">
        {/* Header  */}
        <motion.div
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1 }}
          className="max-w-[800px] flex flex-col gap-3 items-center mx-auto"
        >
          <h1 className="font-moranga text-[33px] sm:text-[44px] font-extralight">
            How {''}
            <span className="bg-gradient-to-r from-[#EA0022]  to-[#754DE8] inline-block text-transparent bg-clip-text">
              simplecx
            </span>{' '}
            Works
          </h1>
          <p className="text-center text-lg brightness-90 font-inter">
            From super prompt ideation to promotion; simplecx transforms your
            idea into a campaign-ready masterpiece in 5 seamless steps.
          </p>
        </motion.div>
        {/* Body */}
        <div className="flex-1 p-2 px-5 grid gap-8 grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={hand}
              alt="Hand"
              width={0}
              height={0}
              sizes="100vw"
              priority
              className="self-center"
            />
          </motion.div>
          {/* Accordian */}
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="flex-1"
          >
            <Accordian />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default index;