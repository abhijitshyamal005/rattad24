import type React from 'react';
import Image from 'next/image';
import { arrowDown, arrowRight } from '@/assets';
interface LanguageSwitcherProps {
  selectedLanguage: string;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  handleLanguageSelect: (code: string) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  selectedLanguage,
  isDropdownOpen,
  toggleDropdown,
  handleLanguageSelect,
}) => {
  const languages = [
    { code: 'ENG', label: 'English' },
    { code: 'SPA', label: 'Spanish' },
    { code: 'GER', label: 'German' },
    { code: 'ARA', label: 'Arabic' },
    { code: 'FRA', label: 'French' },
  ];

  // Dropdown Menu Component
  const DropdownMenu = ({
    className,
    desktop,
  }: {
    className: string;
    desktop?: boolean;
  }) => (
    <ul
      className={`absolute right-[140px] top-[65px] flex flex-col items-start gap-4 bg-[#121212] text-gray-300 rounded-3xl shadow-lg  p-1 ${className}`}
    >
      {languages.map((language) => (
        <li
          key={language.code}
          className="px-4 py-2 text-[14px]  cursor-pointer rounded-md "
          onClick={() => {
            handleLanguageSelect(language.code);
            toggleDropdown();
          }}
        >
          {language.code} ({language.label})
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mt-10 flex items-center justify-between px-6 relative lg:mt-0">
      {/* Language Switch Button */}
      <button
        onClick={toggleDropdown}
        className="text-lg flex justify-between w-full space-x-2 items-center hover:text-gray-400"
      >
        <span>{selectedLanguage}</span>
        {!isDropdownOpen ? (
          <Image
            src={arrowRight}
            width={0}
            height={0}
            sizes="100vw"
            alt="Arrow right"
          />
        ) : (
          <Image
            src={arrowDown}
            width={0}
            height={0}
            sizes="100vw"
            alt="Arrow down"
          />
        )}
      </button>

      {/* Render Dropdown Menus */}
      {isDropdownOpen && (
        <div className="relative">
          {/* Mobile Dropdown Menu (XS to Small Screens) */}
          <DropdownMenu className=" z-10 w-36 shadow-lg p-2 block lg:hidden h-42 text-xs " />
          {/* Large Screen Dropdown Menu (Large Screens Only) */}
          <DropdownMenu className="mt-60  w-36 hidden md:block  text-sm absolute  -top-[211px] -right-[21px] z-[1000]   " />

          {/* top = > minus 210 right  minuts 20 */}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
