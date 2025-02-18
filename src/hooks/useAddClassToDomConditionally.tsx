'use client';
import { useEffect } from 'react';

interface iProps {
  condition: boolean;
  className: string;
  domElement: HTMLElement;
}

export function useAddClassToDOMConditionally({
  condition,
  className,
  domElement,
}: iProps) {
  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof document !== 'undefined') {
      if (condition) {
        domElement.classList.add(className);
      } else {
        domElement.classList.remove(className);
      }

      return () => {
        domElement.classList.remove(className);
      };
    }
  }, [condition, className, domElement]);
}
