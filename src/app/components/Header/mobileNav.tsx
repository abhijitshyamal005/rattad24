'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { type NavLink, links } from './links';
import LanguageSwitcher from './Translator';
import { useAddClassToDOMConditionally } from '@/hooks/useAddClassToDomConditionally';
import { useClickOutSide } from '@/hooks/useClickOutSide';

interface MobileNavProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  isMenuOpen,
  toggleMenu,
  isDropdownOpen,
  toggleDropdown,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ENG');
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Use useEffect to ensure this runs only on the client side
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  useClickOutSide(mobileMenuRef, toggleMenu, isMenuOpen);

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    toggleDropdown();
  };

  return (
    <div
      ref={mobileMenuRef}
      className={`fixed top-[80px] left-0 transform ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } w-full h-screen max-w-[327px] bg-[#121212] text-white flex flex-col z-50 transition-transform duration-300 ease-in-out`}
    >
      {/* Mobile Navigation Links */}
      <nav className="flex flex-col space-y-10 text-2xl pl-[20px] pt-4">
        {links.map((link: NavLink, i: number) => (
          <Link
            href={link.href}
            className="hover:text-gray-400 font-extralight"
            key={i}
            onClick={toggleMenu}
          >
            {link.text}
          </Link>
        ))}
      </nav>

      {/* Language Switcher */}
      <LanguageSwitcher
        selectedLanguage={selectedLanguage}
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        handleLanguageSelect={handleLanguageSelect}
      />
    </div>
  );
};

export default MobileNav;
