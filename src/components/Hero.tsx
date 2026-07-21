import { useEffect, useRef, useState } from 'react';
import { Boxes, ArrowRight, ShieldCheck, Zap, BarChart3, TrendingUp, Package, AlertTriangle } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';

const typewriterPhrases = [
  'Panel de administración',
  'Gestión de inventario',
  'Control de ventas',
  'Auditoría de acciones',
];

function Typewriter() {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setText(typewriterPhrases[0]);
      return;
    }

    const current = typewriterPhrases[phraseIdx];
    const speed = deleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === '') {
          setDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % typewriterPhrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, deleting, phraseIdx]);

  return (
    <span className="text-amber-400">
      {text}
      <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-amber-400 align-middle" />
    </span>
  );
}

function AnimatedBars() {
  const [heights, setHeights] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let frame = 0;
    const baseBars = [40, 65, 50, 80, 55, 90, 70, 60, 85, 75, 95, 60];
    setHeights(baseBars);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      frame++;
      const newHeights = baseBars.map((base, i) => {
        const wave = Math.sin((frame * 0.04) + (i * 0.8)) * 12;
        return Math.max(10, Math.min(100, base + wave));
      });
      setHeights(newHeights);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="flex h-24 items-end gap-1.5">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-amber-600/40 to-amber-400/80 transition-all duration-[120ms] ease-out"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const products = useCountUp<HTMLDivElement>(1248, 2200);
  const sales = useCountUp<HTMLDivElement>(847, 2000);
  const lowStock = useCountUp<HTMLDivElement>(23, 1500);

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Text Content */}
          <div>
            <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-amber-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              Sistema Integrado de Gestión de Inventario y Facturación
            </div>

            <h1 className="animate-fade-up font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Centraliza y automatiza la gestión de tu{' '}
              <span className="text-gradient-animated">negocio de repuestos</span>
            </h1>

            <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-slate-400" style={{ animationDelay: '100ms' }}>
              SIGIF unifica inventario, facturación, clientes y ventas en una sola
              plataforma. Reduce el trabajo manual, mantén un control preciso del
              stock y agiliza la toma de decisiones.
            </p>

            <div className="animate-fade-up mt-10 flex flex-col items-start gap-4 sm:flex-row" style={{ animationDelay: '200ms' }}>
              <a
                href="#features"
                className="group inline-flex items-center gap-2 rounded-lg bg-amber-500 px-7 py-3.5 text-sm font-semibold text-ink-950 transition-all hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/30"
              >
                Conocer características
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10"
              >
                Solicitar demo
              </a>
            </div>

            <div className="animate-fade-up mt-12 flex flex-wrap items-center justify-start gap-x-8 gap-y-3 text-sm text-slate-500" style={{ animationDelay: '300ms' }}>
              <span className="group/icon inline-flex items-center gap-2 transition-all duration-300 hover:text-amber-400 hover:translate-x-1">
                <ShieldCheck className="h-4 w-4 text-amber-500 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-6" /> Seguridad por roles
              </span>
              <span className="group/icon inline-flex items-center gap-2 transition-all duration-300 hover:text-amber-400 hover:translate-x-1">
                <Zap className="h-4 w-4 text-amber-500 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:-rotate-12" /> Automatización de procesos
              </span>
              <span className="group/icon inline-flex items-center gap-2 transition-all duration-300 hover:text-amber-400 hover:translate-x-1">
                <BarChart3 className="h-4 w-4 text-amber-500 transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:rotate-3" /> Auditoría completa
              </span>
            </div>
          </div>

          {/* Right Column: Dashboard Mockup */}
          <div className="animate-fade-up relative" style={{ animationDelay: '400ms' }}>
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-blue-500/8 blur-2xl group-hover:from-amber-500/25 transition-all duration-1000" />
            <div className="relative rounded-2xl border border-white/10 bg-ink-900/80 p-2 shadow-2xl backdrop-blur group hover:border-amber-500/20 hover:shadow-amber-500/5 transition-all duration-700 hover:-translate-y-1 hover:scale-[1.01]">
              <div className="relative overflow-hidden rounded-xl bg-ink-950">
                {/* Animated glowing border accent */}
                <div className="pointer-events-none absolute -inset-[1px] z-10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/20 via-transparent to-amber-500/10 animate-gradient-shift" style={{ backgroundSize: '200% 200%' }} />
                </div>

                <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/60" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/60" />
                    <div className="h-3 w-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="ml-3 flex items-center gap-2 text-xs text-slate-500">
                    <Boxes className="h-3.5 w-3.5 text-amber-500" />
                    SIGIF · <Typewriter />
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-green-400" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    <span className="text-[10px] text-green-400/70 font-medium">En vivo</span>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-3 p-4">
                  <div className="col-span-3 hidden flex-col gap-2 md:flex">
                    {['Inventario', 'Facturación', 'Clientes', 'Auditoría', 'Empresa'].map((item, i) => (
                      <div
                        key={item}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-all duration-300 ${
                          i === 0
                            ? 'bg-amber-500/10 text-amber-400 shadow-sm shadow-amber-500/10'
                            : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                        }`}
                      >
                        <div className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-amber-400' : 'bg-slate-700'}`} />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="col-span-12 md:col-span-9">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-lg border border-white/5 bg-ink-900 p-3 transition-all duration-300 hover:border-amber-500/20 hover:-translate-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Package className="h-3 w-3" /> Productos
                        </div>
                        <div ref={products.ref} className="mt-1 font-display text-lg font-bold text-amber-400">
                          {products.value.toLocaleString('es')}
                        </div>
                      </div>
                      <div className="rounded-lg border border-white/5 bg-ink-900 p-3 transition-all duration-300 hover:border-green-500/20 hover:-translate-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <TrendingUp className="h-3 w-3" /> Ventas hoy
                        </div>
                        <div ref={sales.ref} className="mt-1 font-display text-lg font-bold text-green-400">
                          $ {sales.value.toLocaleString('es')}k
                        </div>
                      </div>
                      <div className="rounded-lg border border-white/5 bg-ink-900 p-3 transition-all duration-300 hover:border-red-500/20 hover:-translate-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <AlertTriangle className="h-3 w-3" /> Stock bajo
                        </div>
                        <div ref={lowStock.ref} className="mt-1 font-display text-lg font-bold text-red-400">
                          {lowStock.value}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-lg border border-white/5 bg-ink-900 p-4 transition-all duration-300 hover:border-amber-500/15">
                      <div className="mb-3 text-xs text-slate-500">Movimientos de inventario</div>
                      <AnimatedBars />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
