"use client";
import React, { useState } from "react";
import CountUp, { useCountUp } from "react-countup";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  googleCloud,
  nvidia,
  selzy,
} from '@/assets/index';

const testimonials = [  
  {
    name: "Kampus Konnekt49",
    role: "Company",
    image: "/c1.svg",
    feedback:
      "Amazing Platform! We enjoyed using simplecx to create multiformat content to reach our target audience, which saved us a lot of time and money. We loved what we were able to create with it. And each content created with it performs excellently well.",
  },
  {
    name: "Ace Beauty Bar",
    role: "Company",
    image: "/c2.jpg",
    feedback:
      "simplecx helped our team bring our marketing vision to life from ideation to promotion. It's a powerful tool and we're looking forward to advanced features.",
  },
  {
    name: "Institute for Sustainable Education and Development",
    role: "Company",
    image: "/c3.jpg",
    feedback:
      "working with simplecx has helped us to be consistent in creating multifaceted marketing content that includes campaigns to reach a broader audience across the regions we serve people. simplecx is just incredible!",
  },
  {
    name: "Beatrice Marowa",
    role: "Chief Operations Manager",
    image: "/c4.jpg",
    feedback:
      "simplecx took our multiformat content game to the next level! It is super simple to use. It saved time and boosted engagement by over 40%!",
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-black text-white py-16 px-6">
      {/* Why Choose Section */}
      <div className="text-center mt-16">
        <h2 className="text-4xl mb-8 font-moranga">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-[#ea0022] to-[#754de8] bg-clip-text text-transparent">
            simplecx
          </span>
          ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 mt-16 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <h3 className="text-xl">Save Time</h3>
            <h3 className="text-5xl font-normal mt-4">
              <CountUp end={40} enableScrollSpy />
              <span className="font-moranga">{'\uFF0B'}</span> {/* Fullwidth Plus */}
            </h3>
            <p className="font-light">Hours saved each month</p>
          </div>
          <div>
            <h3 className="text-xl">simplecx Sales</h3>
            <h3 className="text-5xl font-normal mt-4">
              <CountUp end={25} enableScrollSpy />
              <span className="font-moranga">{'\uFF05'}</span>
            </h3>
            <p className="font-light">Boost in engagement</p>
          </div>
          <div>
            <h3 className="text-xl">Create Faster</h3>
            <h3 className="text-5xl font-normal mt-4">
              <CountUp end={5} enableScrollSpy />
              <span className="">h</span>
            </h3>
            <p className="font-light">Weekly content creation time reduction</p>
          </div>
          <div>
            <h3 className="text-xl">Save Costs</h3>
            <h3 className="text-5xl font-normal mt-4">
              €<CountUp end={600} enableScrollSpy />
            </h3>
            <p className="font-light">Saved monthly on labour</p>
          </div>
        </div>
      </div>

      {/* Happy Customers Section */}
      <div className="text-center mt-44">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl font-moranga mb-8"
        >
          Happy Customers
        </motion.h2>
        <div className="max-w-2xl mx-auto">
          <div className="p-6 rounded-lg">
            <img
              src={currentTestimonial.image}
              alt={currentTestimonial.name}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <h3 className="text-xl font-moranga mt-4">
              {currentTestimonial.name}
            </h3>
            <p className="font-light text-sm">{currentTestimonial.role}</p>
            <img src="/cota.png" alt="" />
            <p className="text-gray-200 italic">
              {currentTestimonial.feedback}
            </p>
          </div>
          {/* Navigation Arrows and Pagination */}
          <div className="flex flex-col items-center space-y-4 mt-8">
            <div className="flex space-x-4">
              <img
                src="/pre.png"
                alt=""
                onClick={prevTestimonial}
                className="w-4 h-4 cursor-pointer"
              />
              <p className="text-white -mt-1 font-light">
                {currentIndex + 1} / {testimonials.length}
              </p>
              <img
                src="/next.png"
                alt=""
                onClick={nextTestimonial}
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Technology Partners Section */}
      <div className="text-center mt-32 mb-20">
        <p className="text-white brightness-90 font-moranga text-4xl mb-16">
          Our Technology Partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 max-w-4xl mx-auto">
          <Image
            src={googleCloud}
            width={180}
            height={60}
            alt="Google Cloud"
            className="object-contain max-sm:w-24 max-sm:h-10"
          />
          <Image
            src={selzy}
            width={180}
            height={60}
            alt="Selzy"
            className="object-contain max-sm:w-24 max-sm:h-10"
          />
          <Image
            src={nvidia}
            width={180}
            height={60}
            alt="Nvidia"
            className="object-contain max-sm:w-24 max-sm:h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
