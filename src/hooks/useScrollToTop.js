import { useRef, useCallback } from "react";

const useScrollToTop = () => {
  const topRef = useRef(null);

  const scrollToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return { topRef, scrollToTop };
};

export default useScrollToTop;
