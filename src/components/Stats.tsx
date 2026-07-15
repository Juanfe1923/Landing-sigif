import { useReveal } from '../hooks/useReveal';
import { useCountUp } from '../hooks/useCountUp';
import { Package, FileText, Users, Clock } from 'lucide-react';

const stats = [
  { icon: Package, value: 1248, suffix: '+', label: 'Productos gestionados', color: 'text-amber-400' },
  { icon: FileText, value: 3500, suffix: '+', label: 'Facturas emitidas', color: 'text-green-400' },
  { icon: Users, value: 45, suffix: '+', label: 'Usuarios activos', color: 'text-blue-400' },
  { icon: Clock, value: 60, suffix: '%', label: 'Menos trabajo manual', color: 'text-purple-400' },
];

export default function Stats() {
  const { ref, className } = useReveal<HTMLDivElement>('scale-in');

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className={`${className} relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-r from-ink-900/80 via-ink-800/60 to-ink-900/80 p-8 md:p-12`}
        >
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
          <div className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <StatItem key={stat.label} {...stat} delay={i * 120} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({
  icon: Icon,
  value,
  suffix,
  label,
  color,
  delay,
}: {
  icon: typeof Package;
  value: number;
  suffix: string;
  label: string;
  color: string;
  delay: number;
}) {
  const { ref, value: count } = useCountUp<HTMLDivElement>(value, 2200);

  return (
    <div className="flex flex-col items-center text-center" style={{ transitionDelay: `${delay}ms` }}>
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
        <Icon className={`h-5 w-5 ${color}`} strokeWidth={2} />
      </div>
      <div ref={ref} className={`font-display text-3xl font-extrabold md:text-4xl ${color}`}>
        {count.toLocaleString('es')}
        {suffix}
      </div>
      <p className="mt-1.5 text-sm text-slate-500">{label}</p>
    </div>
  );
}
