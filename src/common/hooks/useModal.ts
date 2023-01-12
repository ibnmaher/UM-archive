import { useEffect } from 'react';
export const useModal = (
  mainRef: any,
  handler: (e: React.MouseEvent<HTMLUnknownElement>) => void,
  secondaryRef?: any
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (secondaryRef) {
        if (
          !mainRef.current ||
          mainRef.current.contains(event.target) ||
          !secondaryRef.current ||
          secondaryRef.current.contains(event.target)
        ) {
          return;
        }
        handler(event);
      } else {
        if (!mainRef.current || mainRef.current.contains(event.target)) {
          return;
        }
        handler(event);
      }
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [mainRef, secondaryRef, handler]);
};