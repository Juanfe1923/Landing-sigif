import { useReveal } from '../hooks/useReveal';
import { Boxes, FileText, Users, ShieldCheck, Check } from 'lucide-react';

const modules = [
  {
    icon: Boxes,
    name: 'Inventario',
    desc: 'Stock en tiempo real, alertas de stock mínimo, categorización de repuestos y consulta de movimientos.',
    points: ['Alertas de stock bajo', 'Categorización', 'Historial de movimientos'],
  },
  {
    icon: FileText,
    name: 'Facturación',
    desc: 'Emisión de facturas vinculadas al inventario. Descuento automático de stock al vender.',
    points: ['Facturas vinculadas', 'Descuento automático', 'Reportes de ventas'],
  },
  {
    icon: Users,
    name: 'Clientes y Usuarios',
    desc: 'Gestión de clientes con historial de compras. Usuarios con roles y permisos diferenciados.',
    points: ['Roles y permisos', 'Historial de compras', 'Fichas de clientes'],
  },
  {
    icon: ShieldCheck,
    name: 'Auditoría',
    desc: 'Trazabilidad total de acciones. Registro de quién hizo qué y cuándo, para control interno.',
    points: ['Registro de acciones', 'Trazabilidad total', 'Control interno'],
  },
];

export default function Modules() {
  const { ref, className } = useReveal<HTMLDivElement>();

  return (
    <section id="modules" className="relative py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        <div ref={ref} className={`${className} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-500">Módulos del sistema</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Diseñado para un control preciso del negocio
          </h2>
          <p className="mt-4 text-slate-400">
            Cada módulo está integrado con los demás. Lo que registras en inventario
            se refleja en facturación, y cada acción queda registrada en auditoría.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {modules.map((m, i) => (
            <ModuleCard key={m.name} {...m} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleCard({
  icon: Icon,
  name,
  desc,
  points,
  delay,
}: {
  icon: typeof Boxes;
  name: string;
  desc: string;
  points: string[];
  delay: number;
}) {
  const { ref, className } = useReveal<HTMLDivElement>('fade-right');
  return (
    <div
      ref={ref}
      className={`${className} shine-on-hover group relative overflow-hidden rounded-2xl border border-white/5 bg-ink-900/50 p-7 transition-all duration-300 hover:border-amber-500/20 hover:-translate-y-1`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 text-amber-400 ring-1 ring-amber-500/20 transition-transform group-hover:scale-110">
          <Icon className="h-6 w-6" strokeWidth={2} />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold text-white">{name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {points.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-slate-300 transition-colors group-hover:border-amber-500/20"
              >
                <Check className="h-3 w-3 text-amber-500" />
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
