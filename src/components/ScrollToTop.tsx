import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="animate-bounce-in fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-amber-500 text-ink-950 shadow-lg shadow-amber-500/30 transition-all hover:bg-amber-400 hover:scale-110"
      aria-label="Volver arriba"
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}
