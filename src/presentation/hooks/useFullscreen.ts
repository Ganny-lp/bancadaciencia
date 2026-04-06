import { useState } from "react";

export const useFullscreen = (onClose?: () => void) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
    onClose?.();
  };

  return {
    isFullscreen,
    toggleFullscreen,
    exitFullscreen,
    setIsFullscreen,
  };
};
