import { useEffect, useState } from "react";

type UseVisibleElementsResult = {
  topVisibleIndex: number | null;
  visibleIndices: number[];
};

export function useVisibleElements(
  refs: React.RefObject<HTMLElement>[]
): UseVisibleElementsResult {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const [topVisibleIndex, setTopVisibleIndex] = useState<number | null>(null);

  useEffect(() => {
    if (refs.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible: { index: number; top: number }[] = [];

        entries.forEach((entry) => {
          const index = refs.findIndex((ref) => ref.current === entry.target);
          if (index !== -1) {
            if (entry.isIntersecting) {
              visible.push({ index, top: entry.boundingClientRect.top });
            }
          }
        });

        const sorted = visible.sort((a, b) => a.top - b.top);
        const indices = sorted.map((v) => v.index);

        setVisibleIndices(indices);
        setTopVisibleIndex(indices.length > 0 ? indices[0] : null);
      },
      {
        root: null, // viewport
        threshold: 0.01,
      }
    );

    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, [refs]);

  return { topVisibleIndex, visibleIndices };
}
