'use client';
import { useEffect } from 'react';
import Button from '@/app/components/button/Button';
import { rightPurpleShape, lefrPurpleShapre, avatar } from '@/assets';
import { useWindowSize } from '@/hooks/useWindowSize';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const { width } = useWindowSize();
  const xs: number = 450;
  const sm: number = 568;
  const md: number = 1000;
  const lg: number = 1500;

  return (
    <div className={`max-w-full sm:h-screen  relative overflow-hidden`}>
      {/* Text and Buttons Section */}
      <div
        className={`h-full w-full flex flex-col justify-around max-sm:justify-between items-center z-30 ${
          width > lg && 'relative'
        } `}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className={` absolute right-10 -top-[10px] ${width < md && 'hidden'}`}
        >
          <Image
            src={avatar}
            alt="Avatar"
            sizes="100vw"
            priority
            width={width > lg ? 500 : width > md ? 350 : 349}
            height={500}
          />
        </motion.div>
        <div
          className={`max-w-[790px] mx-auto flex flex-col items-center gap-4 text-white ${
            width < sm && 'w-[330px] max-sm:mt-8 max-sm:mb-8'
          } relative overflow-hidden`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className={` w-full ${
              width > md && 'hidden'
            }  absolute max-w-full    ${
              width < xs
                ? ' -right-[235px] top-[90px]'
                : width < sm
                ? ' -right-[200px]  top-[89px]'
                : width < md
                ? ' -right-[10px]  top-[210px]'
                : width > lg
                ? ' -right-[800px]  -top-[100px]'
                : ''
            }`}
          >
            <Image
              src={avatar}
              alt="Avatar"
              sizes=""
              width={
                width < xs
                  ? 150
                  : width < sm
                  ? 200
                  : width < md
                  ? 200
                  : width < lg
                  ? 250
                  : 450
              }
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`text-[30px] sm:text-[44px] z-20 font-[400] font-moranga max-sm:max-w-[300px] text-center max-sm:mt-8  ${
              width < md && 'mt-32'
            } 
             
             `}
          >
            Multimodal Content Creation is Now <br />
            Super Simple With{' '}
            <p className="z-4 bg-gradient-to-tr from-[#EA0022] to-[#754DE8] inline-block text-transparent bg-clip-text">
              simplecx
            </p>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className={`font-inter font-[100] z-30 max-w-[770px] ml-4 text-[14px] sm:text-[20px] text-center brightness-75 ${
              width < sm && 'w-[270px] '
            } ${width < md && 'max-w-[350px]'}`}
          >
            Turn Ideas into High-Converting Content Instantly with simplecx. The
            AI-Powered Platform That Streamlines Creation, Boosts Quality, and
            Delivers Results Fast.
          </motion.p>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-2 mt-5 z-30"
          >
            <Link href="/#gain-early-access">
              <Button
                class={
                  'w-[190px] h-[50px] rounded-[30px] bg-gradient-to-r from-[#EA0022] to-[#754DE8]'
                }

              >
                Gain Early Access
              </Button>
            </Link>
            <Link href="/login">
              <Button
                class={
                  'w-[190px] h-[50px] rounded-[30px] p-[1.5px] bg-gradient-to-r from-[#EA0022] to-[#754DE8]'
                }
              >
                <div className="w-full h-full bg-[#070707] flex items-center justify-center rounded-[30px]">
                  See How it Works
                </div>
              </Button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className={`flex flex-col max-w-[798px] text-white  ${
            width < sm && 'max-w-[260px] py-[70px]'
          } `}
        >
          <div
            className={`text-[30px] font-[200] sm:text-[44px] font-moranga text-center max-sm:max-w-[290px] max-sm:self-center z-30`}
          >
            Why{' '}
            <p className="z-4 bg-gradient-to-tr from-[#EA0022] to-[#754DE8] inline-block text-transparent bg-clip-text">
              simplecx
            </p>{' '}
            Outshines the Rest?
          </div>
          <p
            className={`font-inter font-extralight text-[14px]  sm:text-[20px] text-center brightness-75 max-sm:max-w-[290px] z-30`}
          >
            Juggling multiple campaigns is easy with simplecx. Stay organised
            and inspired while managing social media, email marketing, and blogs
            without breaking a sweat.
          </p>
        </motion.div>
      </div>

      {/* Left Image */}
      <motion.div
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className={`absolute left-0 ${
          width < sm && 'left-[-50px] bottom-[270px]'
        } bottom-20 brightness-50 z-10`}
      >
        <Image
          src={lefrPurpleShapre}
          width={0}
          height={0}
          sizes="100vw"
          className={`${
            width < xs
              ? 'w-[150px]'
              : width < sm
              ? 'w-[200px]'
              : width < md
              ? 'w-[210px]'
              : width < lg
              ? 'w-[210px]'
              : 'w-[250px]'
          }`}
          priority
          alt="purple Ball"
        />
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ x: 200 }}
        animate={{ x: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className={`absolute right-0 ${
          width < sm
            ? 'top-[0px]'
            : width < md
            ? 'top-[0px]'
            : width < lg
            ? 'top-[0px]'
            : 'top-[0px]'
        }  z-10 `}
      >
        <Image
          src={rightPurpleShape}
          width={0}
          height={0}
          sizes="100vw"
          className={`${
            width < sm
              ? 'w-[80px]'
              : width < md
              ? 'w-[90px]'
              : width < lg
              ? 'w-[100px]'
              : 'w-[110px]'
          } -mr-5 lg:-mr-0`}
          priority
          alt="purple Ball"
        />
      </motion.div>
    </div>
  );
};

export default Hero;