import { useEffect, useRef } from "react";

export function useOutsideClick(
  handler: () => void,
  listerCapturing: boolean = true
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    }

    document.addEventListener("click", handleClick, true);

    return () =>
      document.removeEventListener("click", handleClick, listerCapturing);
  }, [handler, listerCapturing]);

  return ref;
}
