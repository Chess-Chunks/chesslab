import { useEffect, useRef } from "react";

type Props = {
  id: string;
  children: React.ReactNode;
  onVisible?: (id: string) => void;
};

export function TrackedInsight({ id, children, onVisible }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible?.(id);
        }
      },
      {
        threshold: 0.5,
      }
    );

    const node = ref.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [id, onVisible]);

  return (
    <div ref={ref} id={id} className="scroll-mt-16">
      {children}
    </div>
  );
}
