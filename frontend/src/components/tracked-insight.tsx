import { useEffect, useRef } from "react";

export function TrackedInsight({
  id,
  children,
  onVisible,
  scrollContainerRef,
}: {
  id: string;
  children: React.ReactNode;
  onVisible: (id: string) => void;
  scrollContainerRef: React.RefObject<HTMLElement>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(id);
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.5,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [id, onVisible, scrollContainerRef]);

  return (
    <div ref={ref} id={id}>
      {children}
    </div>
  );
}
