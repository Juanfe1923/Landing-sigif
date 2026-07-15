import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { Boxes, ShoppingCart, FileText, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: Boxes,
    title: 'Inventario',
    desc: 'Registras el repuesto en el sistema con su categoría, precio y stock inicial.',
    detail: 'Cada producto se categoriza, se le asigna un precio y se establece un nivel mínimo de stock. El sistema monitorea automáticamente cuándo un producto necesita reposición.',
  },
  {
    icon: ShoppingCart,
    title: 'Carrito de compras',
    desc: 'Seleccionas los repuestos que el cliente desea comprar.',
    detail: 'El carrito verifica disponibilidad de stock al instante, calcula totales automáticamente y permite ajustar cantidades antes de proceder a la facturación.',
  },
  {
    icon: FileText,
    title: 'Facturación',
    desc: 'Generas la factura con un clic. El stock se descuenta automáticamente.',
    detail: 'La factura se emite con los datos del cliente, el detalle de los productos, los impuestos calculados y el total. Al confirmar, el inventario se actualiza al instante.',
  },
  {
    icon: ShieldCheck,
    title: 'Auditoría',
    desc: 'Cada acción del proceso queda registrada para control interno.',
    detail: 'El módulo de auditoría registra automáticamente cada operación: creación de productos, modificaciones de stock, emisión de facturas, accesos al sistema y cambios de configuración.',
  },
];

export default function Workflow() {
  const { ref, className } = useReveal<HTMLDivElement>();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className={`${className} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-500">Flujo de trabajo</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Cómo SIGIF conecta cada etapa del negocio
          </h2>
          <p className="mt-4 text-slate-400">
            Desde que registras un producto hasta que la venta queda auditada,
            cada módulo trabaja en conjunto para mantener todo sincronizado.
          </p>
        </div>

        <div className="mt-16 hidden md:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-7 h-0.5 bg-white/5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-500 ease-out"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <div className="relative grid grid-cols-4 gap-4">
              {steps.map((step, i) => (
                <button key={step.title} onClick={() => setActiveStep(i)} className="group flex flex-col items-center">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      i <= activeStep
                        ? 'border-amber-500 bg-amber-500 text-ink-950 shadow-lg shadow-amber-500/30'
                        : 'border-white/10 bg-ink-900 text-slate-500'
                    } ${i === activeStep ? 'scale-110' : 'group-hover:scale-105'}`}
                  >
                    <step.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <span className={`mt-3 font-display text-sm font-semibold transition-colors ${i === activeStep ? 'text-amber-400' : 'text-slate-400'}`}>
                    {step.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-white/5 bg-ink-900/50 p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
                {(() => { const Icon = steps[activeStep].icon; return <Icon className="h-5 w-5" strokeWidth={2} />; })()}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">{steps[activeStep].title}</h3>
                <p className="mt-1.5 text-sm text-slate-400">{steps[activeStep].detail}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-4 md:hidden">
          {steps.map((step, i) => (
            <MobileStep key={step.title} step={step} isLast={i === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileStep({ step, isLast }: { step: typeof steps[0]; isLast: boolean }) {
  const { ref, className } = useReveal<HTMLDivElement>('fade-right');
  return (
    <div ref={ref} className={`${className} relative pl-14`}>
      {!isLast && <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-white/5" />}
      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-500 text-ink-950">
        <step.icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <div className="rounded-xl border border-white/5 bg-ink-900/50 p-4">
        <h3 className="font-display text-sm font-bold text-white">{step.title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">{step.desc}</p>
      </div>
    </div>
  );
}
