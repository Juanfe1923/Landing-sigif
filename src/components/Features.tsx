import { useReveal } from '../hooks/useReveal';
import {
  Boxes,
  Users,
  FileText,
  ShoppingCart,
  ShieldCheck,
  Building2,
  History,
  ClipboardList,
} from 'lucide-react';

const features = [
  { icon: Boxes, title: 'Gestión de inventario', desc: 'Control total del stock de repuestos con seguimiento de entradas, salidas y niveles mínimos.' },
  { icon: Users, title: 'Administración de usuarios', desc: 'Gestión de usuarios con roles y permisos diferenciados para cada área del negocio.' },
  { icon: FileText, title: 'Módulo de facturación', desc: 'Emisión rápida de facturas vinculadas al inventario, con descuento automático de stock.' },
  { icon: ShoppingCart, title: 'Carrito de compras', desc: 'Carrito integrado al inventario que agiliza las ventas y mantiene el stock sincronizado.' },
  { icon: ShieldCheck, title: 'Auditoría de acciones', desc: 'Registro detallado de cada acción realizada en el sistema para trazabilidad total.' },
  { icon: Building2, title: 'Administración de empresa', desc: 'Centraliza la información de la empresa, datos fiscales y configuración general.' },
  { icon: History, title: 'Historial y movimientos', desc: 'Consulta el historial completo de movimientos del inventario en cualquier momento.' },
  { icon: ClipboardList, title: 'Control de clientes', desc: 'Administra datos de clientes, historial de compras y relación comercial completa.' },
];

export default function Features() {
  const { ref, className } = useReveal<HTMLDivElement>();

  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className={`${className} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-500">Funcionalidades</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Todo lo que tu negocio necesita, en un solo lugar
          </h2>
          <p className="mt-4 text-slate-400">
            SIGIF cubre los procesos principales del negocio de venta de repuestos
            para motocicletas, reduciendo el trabajo manual y mejorando el control
            de la información.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: typeof Boxes;
  title: string;
  desc: string;
  delay: number;
}) {
  const { ref, className } = useReveal<HTMLDivElement>('fade-up');
  return (
    <div
      ref={ref}
      className={`${className} shine-on-hover group relative rounded-xl border border-white/5 bg-ink-900/50 p-6 transition-all duration-300 hover:border-amber-500/20 hover:bg-ink-900 hover:-translate-y-1`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500 transition-all duration-300 group-hover:bg-amber-500 group-hover:text-ink-950 group-hover:scale-110">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <h3 className="font-display text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{desc}</p>
    </div>
  );
}
