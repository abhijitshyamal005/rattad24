'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { truncate } from 'fs';
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.2,
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Features = () => {
  const refElement = useRef(null);
  const isInView = useInView(refElement, { once: true });

  const features = [
    {
      icon: '/f1.png',
      title: 'Streamline Brainstorming',
      description:
        'Generate fresh, engaging ideas for each campaign in minutes-no more creative burnout.',
    },
    {
      icon: '/f2.png',
      title: 'Stay on Brand',
      description:
        'simplecx ensures consistency across all your campaigns, with a unified tone, style, and messaging.',
    },
    {
      icon: '/f3.png',
      title: 'Quick Content Creation',
      description:
        'Let simplecx turn your concepts into high-quality, ready-to-publish content in no time.',
    },
    {
      icon: '/f4.png',
      title: 'Track Your Progress',
      description:
        'Keep everything organised, so you never lose sight of your campaign goals and deadlines.',
    },
    {
      icon: '/f5.png',
      title: 'Easily Adapt Across Channels',
      description:
        'From social posts to emails and blogs, create versatile content tailored for promotion across different platforms and audiences.',
    },
    {
      icon: '/f6.png',
      title: 'Refine with Expert Support',
      description:
        'With simplecx, human experts provide personalised feedback to polish your content, boost SEO, and keep your voice.',
    },
  ];

  return (
    <div className="bg-black   text-white px-6 md:px-16 lg:px-32 py-20 flex flex-col justify-center items-center">
      <motion.div
        ref={refElement}
        initial={{ opacity: 0 }}
        animate={isInView && { opacity: 1 }}
        className="text-center mb-12 md:max-w-[950px] flex flex-col items-center "
      >
        <h2 className="text-3xl md:text-4xl font-moranga ">
          Struggling to Create Multimodal Consistent Content?
        </h2>
        <h3 className="font-moranga text-2xl md:text-4xl mt-2">
          <span className="bg-gradient-to-r font-moranga from-[#ea0022] to-[#754de8] bg-clip-text text-transparent">
            simplecx
          </span>{' '}
          simplifies it all
        </h3>
        <p className="font-inter mt-2 brightness-75 text-gray-300 font-[200] md:px-[62px] md:text-[20px] text-center">
          Having trouble keeping up with consistent, high-quality content?
          Juggling endless tasks, multiple formats, and creative roadblocks can
          drain your time and energy.
        </p>
      </motion.div>
      <motion.div
        ref={refElement}
        variants={container}
        animate={isInView ? 'show' : 'hidden'}
        initial="hidden"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ml-4 gap-10"
      >
        {features.map((feature) => (
          <motion.div
            variants={item}
            key={feature.title}
            className="flex cursor-pointer shadow-white/10 flex-col max-w-[390px] items-start rounded-lg p-6 shadow-lg hover:scale-105 transition-transform"
          >
            <div className="w-16 h-16 mb-4">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={64}
                height={64}
                className="rounded-full"
              />
            </div>
            <h4 className="text-[22px] font-light font-moranga text-white mb-2">
              {feature.title}
            </h4>
            <p className="text-gray-400 brightness-85 text-sm font-light">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
