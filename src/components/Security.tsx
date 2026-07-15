import { useReveal } from '../hooks/useReveal';
import { Lock, Eye, UserCog, ServerCog, KeyRound, FileLock2 } from 'lucide-react';

const pillars = [
  { icon: Lock, title: 'Seguridad', desc: 'Acceso protegido con autenticación. Cada acción queda registrada para garantizar la integridad de la información.' },
  { icon: UserCog, title: 'Roles y permisos', desc: 'Usuarios con diferentes roles que controlan qué pueden ver y modificar dentro del sistema.' },
  { icon: Eye, title: 'Auditoría total', desc: 'Trazabilidad de cada operación. Registro de quién, qué y cuándo para control interno.' },
  { icon: ServerCog, title: 'Escalabilidad', desc: 'Arquitectura preparada para crecer con el negocio, sin comprometer el rendimiento.' },
  { icon: KeyRound, title: 'Uso interno', desc: 'Pensado para el equipo de la empresa, con énfasis en la protección de datos sensibles.' },
  { icon: FileLock2, title: 'Mantenimiento', desc: 'Código estructurado y documentado que facilita las actualizaciones y la evolución del sistema.' },
];

export default function Security() {
  const { ref, className } = useReveal<HTMLDivElement>();

  return (
    <section id="security" className="relative py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        <div ref={ref} className={`${className} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-500">Seguridad y confianza</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Información protegida, decisiones confiables
          </h2>
          <p className="mt-4 text-slate-400">
            SIGIF está diseñado para uso interno de la empresa, con énfasis en la
            seguridad, la escalabilidad y la facilidad de mantenimiento.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <PillarCard key={p.title} {...p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: typeof Lock;
  title: string;
  desc: string;
  delay: number;
}) {
  const { ref, className } = useReveal<HTMLDivElement>('fade-up');
  return (
    <div
      ref={ref}
      className={`${className} shine-on-hover group rounded-xl border border-white/5 bg-ink-900/50 p-6 transition-all duration-300 hover:border-amber-500/20 hover:bg-ink-900 hover:-translate-y-1`}
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
