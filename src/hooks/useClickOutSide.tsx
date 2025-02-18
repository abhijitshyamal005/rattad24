import { useEffect, RefObject } from 'react';

export function useClickOutSide(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  isMenuOpen: boolean
) {
  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (!isMenuOpen) {
        return;
      }
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutSide);

    return () => document.removeEventListener('click', handleClickOutSide);
  }, [ref, callback]);
}
