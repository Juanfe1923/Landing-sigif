import { useEffect, useState } from 'react';
import { Menu, X, Boxes } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';

const links = [
  { label: 'Características', href: '#features' },
  { label: 'Módulos', href: '#modules' },
  { label: 'Tecnología', href: '#tech' },
  { label: 'Seguridad', href: '#security' },
  { label: 'Testimonios', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

const sectionIds = ['top', 'features', 'modules', 'tech', 'security', 'testimonials', 'faq'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/5 bg-ink-950/80 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20 transition-transform group-hover:scale-110">
            <Boxes className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-extrabold tracking-tight text-white">
            SIGIF
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const sectionId = l.href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-amber-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-amber-400" />
                )}
              </a>
            );
          })}
          <a
            href="#contacto"
            className="ml-3 rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-ink-950 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/30"
          >
            Solicitar demo
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-slate-300 transition-colors hover:text-white md:hidden"
          aria-label="Menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="overflow-hidden border-t border-white/5 bg-ink-950/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="animate-slide-down rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-amber-500 px-5 py-2.5 text-center text-sm font-semibold text-ink-950"
            >
              Solicitar demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
