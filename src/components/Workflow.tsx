import { useState, useEffect, useRef, useCallback } from 'react';
import { useReveal } from '../hooks/useReveal';
import { Boxes, ShoppingCart, FileText, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  {
    icon: Boxes,
    title: 'Inventario',
    desc: 'Registras el repuesto en el sistema con su categoría, precio y stock inicial.',
    detail: 'Cada producto se categoriza, se le asigna un precio y se establece un nivel mínimo de stock. El sistema monitorea automáticamente cuándo un producto necesita reposición.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: ShoppingCart,
    title: 'Carrito de compras',
    desc: 'Seleccionas los repuestos que el cliente desea comprar.',
    detail: 'El carrito verifica disponibilidad de stock al instante, calcula totales automáticamente y permite ajustar cantidades antes de proceder a la facturación.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FileText,
    title: 'Facturación',
    desc: 'Generas la factura con un clic. El stock se descuenta automáticamente.',
    detail: 'La factura se emite con los datos del cliente, el detalle de los productos, los impuestos calculados y el total. Al confirmar, el inventario se actualiza al instante.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: ShieldCheck,
    title: 'Auditoría',
    desc: 'Cada acción del proceso queda registrada para control interno.',
    detail: 'El módulo de auditoría registra automáticamente cada operación: creación de productos, modificaciones de stock, emisión de facturas, accesos al sistema y cambios de configuración.',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export default function Workflow() {
  const { ref, className } = useReveal<HTMLDivElement>();
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating || index === activeStep) return;
      setIsAnimating(true);
      setDirection(index > activeStep ? 'next' : 'prev');
      setActiveStep(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [activeStep, isAnimating]
  );

  const next = useCallback(() => {
    goTo((activeStep + 1) % steps.length);
  }, [activeStep, goTo]);

  const prev = useCallback(() => {
    goTo((activeStep - 1 + steps.length) % steps.length);
  }, [activeStep, goTo]);

  // Auto-play — always active, resumes quickly after hover interaction
  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      next();
    }, 4000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [next]);

  const activeIcon = steps[activeStep].icon;

  return (
    <section
      id="workflow"
      className="relative py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className={`${className} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-500">
            Flujo de trabajo
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Cómo SIGIF conecta cada etapa del negocio
          </h2>
          <p className="mt-4 text-slate-400">
            Desde que registras un producto hasta que la venta queda auditada,
            cada módulo trabaja en conjunto para mantener todo sincronizado.
          </p>
        </div>

        {/* Desktop Carousel */}
        <div className="mt-16 hidden md:block">
          {/* Progress Line */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-7 h-0.5 bg-white/5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            {/* Step Indicators */}
            <div className="relative grid grid-cols-4 gap-4">
              {steps.map((step, i) => (
                <button
                  key={step.title}
                  onClick={() => goTo(i)}
                  className="group flex flex-col items-center"
                  disabled={isAnimating}
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                      i <= activeStep
                        ? 'border-amber-500 bg-amber-500 text-ink-950 shadow-lg shadow-amber-500/30'
                        : 'border-white/10 bg-ink-900 text-slate-500'
                    } ${i === activeStep ? 'scale-110 animate-pulse-glow' : 'group-hover:scale-105'}
                    ${i < activeStep ? 'opacity-60' : ''}`}
                  >
                    <step.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <span
                    className={`mt-3 font-display text-sm font-semibold transition-all duration-300 ${
                      i === activeStep
                        ? 'text-amber-400 scale-105'
                        : i < activeStep
                          ? 'text-slate-500'
                          : 'text-slate-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Detail Panel with Slide Animation */}
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/5 bg-ink-900/50">
            <div className="relative min-h-[160px]">
              <div
                key={activeStep}
                className={`animate-${
                  direction === 'next' ? 'slide-in-right' : 'slide-in-left'
                } p-7`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${steps[activeStep].gradient} text-white`}
                  >
                    {(() => {
                      const Icon = activeIcon;
                      return <Icon className="h-5 w-5" strokeWidth={2} />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-white">
                      {steps[activeStep].title}
                      <span className="ml-2 inline-block text-xs font-normal text-slate-500">
                        Paso {activeStep + 1} de {steps.length}
                      </span>
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-400">
                      {steps[activeStep].detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
              <button
                onClick={prev}
                disabled={isAnimating}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-ink-800 text-slate-400 transition-all hover:border-amber-500/30 hover:text-amber-400 hover:bg-amber-500/10 disabled:opacity-40"
                aria-label="Paso anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                disabled={isAnimating}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-ink-800 text-slate-400 transition-all hover:border-amber-500/30 hover:text-amber-400 hover:bg-amber-500/10 disabled:opacity-40"
                aria-label="Paso siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 pb-4">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  disabled={isAnimating}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === activeStep
                      ? 'w-8 bg-amber-500'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Ir al paso ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical stack with enhanced animations */}
        <div className="mt-12 space-y-4 md:hidden">
          {steps.map((step, i) => (
            <MobileStep key={step.title} step={step} isLast={i === steps.length - 1} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileStep({
  step,
  isLast,
  index,
}: {
  step: (typeof steps)[0];
  isLast: boolean;
  index: number;
}) {
  const { ref, className } = useReveal<HTMLDivElement>('fade-right');
  return (
    <div
      ref={ref}
      className={`${className} relative pl-14`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {!isLast && (
        <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/40 to-white/5" />
      )}
      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-500 text-ink-950 shadow-lg shadow-amber-500/20">
        <step.icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <div className="rounded-xl border border-white/5 bg-ink-900/50 p-4 transition-all duration-300 hover:border-amber-500/20 hover:-translate-y-0.5">
        <h3 className="font-display text-sm font-bold text-white">{step.title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">{step.desc}</p>
      </div>
    </div>
  );
}

