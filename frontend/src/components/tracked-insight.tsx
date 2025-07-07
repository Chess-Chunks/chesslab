import { useEffect, useRef } from "react";

type Props = {
  id: string;
  children: React.ReactNode;
};

export function TrackedInsight({ id, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          history.replaceState(null, "", `#${id}`);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [id]);

  return (
    <div ref={ref} id={id} className="scroll-mt-16">
      {children}
    </div>
  );
}
