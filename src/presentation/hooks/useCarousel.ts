import { useState, useCallback, useMemo } from "react";

interface UseCarouselProps {
  itemsLength: number;
  visibleCount?: number;
}

export const useCarousel = ({
  itemsLength,
  visibleCount = 4,
}: UseCarouselProps) => {
  const [index, setIndex] = useState(0);

  const nextSlide = useCallback(
    () => setIndex((prev) => (prev + 1) % itemsLength),
    [itemsLength],
  );

  const prevSlide = useCallback(
    () => setIndex((prev) => (prev - 1 + itemsLength) % itemsLength),
    [itemsLength],
  );

  const getVisibleItems = useCallback(
    <T>(items: T[]): T[] => {
      const visible = [];
      for (let i = 0; i < visibleCount; i++) {
        visible.push(items[(index + i) % itemsLength]);
      }
      return visible;
    },
    [index, itemsLength, visibleCount],
  );

  return useMemo(
    () => ({ index, nextSlide, prevSlide, getVisibleItems }),
    [index, nextSlide, prevSlide, getVisibleItems],
  );
};
