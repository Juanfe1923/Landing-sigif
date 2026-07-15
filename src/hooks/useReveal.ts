import { useEffect, useRef, useState } from 'react';

type RevealVariant = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in' | 'blur-in';

const variantClasses: Record<RevealVariant, { hidden: string; visible: string }> = {
  'fade-up': { hidden: 'opacity-0 translate-y-6', visible: 'animate-fade-up' },
  'fade-left': { hidden: 'opacity-0 -translate-x-8', visible: 'animate-fade-left' },
  'fade-right': { hidden: 'opacity-0 translate-x-8', visible: 'animate-fade-right' },
  'scale-in': { hidden: 'opacity-0 scale-95', visible: 'animate-scale-in' },
  'blur-in': { hidden: 'opacity-0 blur-sm', visible: 'animate-blur-in' },
};

export function useReveal<T extends HTMLElement = HTMLDivElement>(variant: RevealVariant = 'fade-up') {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    const fallback = setTimeout(() => setVisible(true), 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [variant]);

  const classes = variantClasses[variant];
  return {
    ref,
    className: visible ? classes.visible : classes.hidden,
  };
}
