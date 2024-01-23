import { useEffect, RefObject } from "react";

const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the clicked element is outside the target element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Attach the event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
