'use client';
import LanguageSwitcher from '@/app/components/Header/Translator'; // Named import
import MobileNav from '@/app/components/Header/mobileNav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { type NavLink, links } from './links';
import Image from 'next/image';
import { closeButton, hamburgerMenu, headerLeftLogo } from '@/assets';
import { useWindowSize } from '@/hooks/useWindowSize';

const Header = () => {
  const { width } = useWindowSize();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ENG');
  const [isMobile, setIsMobile] = useState(false);

  //Calculatioon should be done in separate component!!!!
  useEffect(() => {
    setIsMobile(width <= 1024);
  }, [width]);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 1024; // Mobile view condition
      setIsMobile(isMobileView);


      if (isMobileView) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen((pre) => !pre);
  };

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    setIsDropdownOpen(false);
  };

  return (
    <nav
      // className={` text-white w-full px-6 lg:px-16 py-4 flex justify-between items-center fixed  `}
      className={`bg-[#070707] w-full px-6 sm:px-4 shadow-xl mx-auto overflow-hidden text-white z-50 h-[80px] flex justify-between items-center relative`}
    >
      {/* Logo Section */}
      <div className="flex items-center">
        {/* Why img? */}
        {/* <img src="/logo.png" alt="Logo" className="h-8" /> */}
        <Link href="/">
          <Image
            src={headerLeftLogo}
            sizes="100vw"
            height={0}
            width={0}
            priority={true}
            alt="simplecx logo"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="hidden lg:flex space-x-10 ml-auto">
          {links.map((link: NavLink, i: number) => (
            <Link
              key={i}
              href={link.href}
              className={`text-xl hover:text-gray-400 transition-colors relative ${
                pathname === link.href
                  ? 'after:block after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-gradient-to-r after:from-[#EA0022] after:to-[#754DE8]'
                  : ''
              }`}
            >
              {link.text}
            </Link>
          ))}
        </div>
      )}
      <div
        onClick={() => setIsMenuOpen(false)}
        role="link"
        className="button button-as-link button-primary h-[40px] sm:w-[200px] button-lg p-[1px] ml-10 "
      >
        <Link
          href="/#early-access"
          className="flex h-full w-full bg-[#111111] rounded-[2500rem] p-4 text-[14px] max-sm:text-[12px] max-sm:px-0 max-sm:w-[140px] justify-center items-center "
        >
          Gain Early Access
        </Link>
      </div>
      {/* Right Section (Desktop Only) */}
      {!isMobile && (
        <div className="hidden lg:flex items-center space-x-10 ml-6">
          {/* Language Switcher for Desktop */}
          <LanguageSwitcher
            selectedLanguage={selectedLanguage}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            handleLanguageSelect={handleLanguageSelect}
          />
        </div>
      )}

      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden -order-1 mr-4 ">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <Image
            src={isMenuOpen ? closeButton : hamburgerMenu}
            width={40}
            height={40}
            sizes="100vw"
            alt="Hamburger menue"
            priority
          />
        </button>
      </div>

      {/* Mobile Navigation */}

      <MobileNav
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
      />
    </nav>
  );
};

export { Header };
