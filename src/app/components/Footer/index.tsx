import React from "react";
import {
  facebook,
  instagram,
  linkedin,
  productOf,
  simplecx,
  tiktok,
  x,
} from "@/assets/index";
import Image from "next/image";
import Link from "next/link";

// related to social media icons
const socialIcons = [
  {
    src: instagram,
    alt: "Instagram",
    url: "https://www.instagram.com/retinkmedia?igsh=M2t5eDVvazFpNzM5",
  },
  {
    src: linkedin,
    alt: "LinkedIn",
    url: "https://www.linkedin.com/company/retink",
  },
  {
    src: tiktok,
    alt: "TikTok",
    url: "https://www.tiktok.com/@retinkmedia?is_from_webapp=1&sender_device=pc",
  },
  { src: x, alt: "X (Twitter)", url: "https://x.com/retinkmedia" },
  {
    src: facebook,
    alt: "Facebook",
    url: "https://www.facebook.com/retinkmedia",
  },
];

//  SocialIcon component with clickable links
const SocialIcon = ({
  src,
  alt,
  size,
  url,
}: {
  src: string;
  alt: string;
  size: number;
  url: string;
}) => (
  <Link href={url} target="_blank" rel="noopener noreferrer">
    <Image
      src={src}
      width={size}
      height={size}
      sizes="100vw"
      className="max-sm:w-[28px] max-sm:h-[28px] cursor-pointer"
      priority
      alt={alt}
    />
  </Link>
);

const Footer = () => {
  return (
    <footer className="w-full bg-[#121212]">
      <section className="max-w-[1500px] w-full mx-auto p-6 max-sm:px-0 relative">
        <div className="w-full flex flex-wrap items-start justify-between max-sm:flex-col max-sm:items-start max-sm:gap-6 max-sm:w-full max-sm:pl-4">
          {/* Left  ( Desktop) */}
          <div className="flex flex-col items-start gap-4 max-sm:w-full max-sm:ml-0 mt-[20px] max-sm:mt-0">
            <Image
              src={simplecx}
              width={0}
              height={0}
              sizes="100vw"
              alt="Simplecx logo"
              className="max-sm:w-[120px] max-sm:ml-0"
            />
            <Image
              src={productOf}
              width={0}
              height={0}
              sizes="100vw"
              alt="Product of logo"
              className="max-sm:w-[90px] max-sm:ml-0"
            />
          </div>

          {/* Middle - Links  */}
          <div className="flex-1 font-inter text-[14px] brightness-90 flex flex-wrap justify-around text-white self-center gap-8 max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:w-full max-sm:ml-0">
            <div className="flex flex-col items-start gap-2 max-sm:w-full max-sm:ml-0">
              <Link href={"/about"}>About simplecx</Link>
              <Link href={"/contact"}>Contact Us</Link>
            </div>
            <div className="flex flex-col items-start gap-2 max-sm:w-full max-sm:ml-0">
              <Link href={"/privacy-policy"}>Privacy Policy</Link>
              <Link href={"/terms-of-service"}>Terms Of Service</Link>
            </div>
            <div className="flex flex-col items-start gap-2 max-sm:w-full max-sm:ml-0">
              <Link href={"/#early-access"}>Gain Early Access</Link>
              <Link href={"/contact"}>Freelance Partners</Link>
            </div>
            <div className="flex flex-col items-start gap-2 max-sm:w-full max-sm:ml-0">
              <Link href={"/faq"}>FAQs</Link>
              <Link href={"/contact"}>Provide Feedback</Link>
            </div>
            <div className="flex flex-col items-start gap-2 max-sm:w-full max-sm:ml-0">
              <Link href={"/about"}>Climate Commitment</Link>
            </div>
          </div>

          {/* Social Media Icons (For Mobile)  */}
          <div className="hidden max-sm:flex items-start gap-3 text-white max-sm:w-full max-sm:ml-0">
            <div className="flex gap-3 max-sm:ml-0">
              {socialIcons.map((icon, index) => (
                <SocialIcon
                  key={index}
                  src={icon.src}
                  alt={icon.alt}
                  size={28}
                  url={icon.url}
                />
              ))}
            </div>
          </div>

          {/*  Social Media Icons (Desktop)  */}
          <div className="flex justify-end items-center gap-2 text-white mt-[30px] max-sm:hidden">
            {socialIcons.map((icon, index) => (
              <SocialIcon
                key={index}
                src={icon.src}
                alt={icon.alt}
                size={30}
                url={icon.url}
              />
            ))}
          </div>

          {/* Copyright */}
          <div className="w-full text-right mt-1 max-sm:w-full max-sm:text-center max-sm:mt-6">
            <p className="text-[10px] max-sm:text-[12px] font-inter brightness-90 text-white max-sm:text-center mt-[10px]">
              Copyright &copy; {new Date().getFullYear()} simplecx
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
