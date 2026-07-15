import { useReveal } from '../hooks/useReveal';
import { Database, Code2, Layers, GitBranch, Check, Server, Cloud, Terminal, Cpu } from 'lucide-react';

const techStack = [
  { label: 'Python', desc: 'Lenguaje principal del backend', version: '3.11+' },
  { label: 'Django', desc: 'Framework web del lado del servidor', version: '4.2' },
  { label: 'SQLite', desc: 'Base de datos de desarrollo', version: '3.x' },
  { label: 'PostgreSQL', desc: 'Migración a producción disponible', version: '15+' },
  { label: 'HTML / CSS', desc: 'Estructura y estilos de la interfaz', version: '5 / 3' },
  { label: 'JavaScript', desc: 'Interactividad del lado del cliente', version: 'ES6+' },
  { label: 'Bootstrap', desc: 'Framework CSS responsivo', version: '5.3' },
  { label: 'Arquitectura monolítica', desc: 'Despliegue simple y mantenible', version: '—' },
];

const architecturePoints = [
  {
    icon: Layers,
    title: 'Arquitectura monolítica',
    desc: 'Despliegue simple, fácil de mantener y escalar según las necesidades del negocio. Todo el sistema vive en una sola aplicación.',
  },
  {
    icon: Database,
    title: 'Base de datos relacional',
    desc: 'SQLite en desarrollo, con migración directa a PostgreSQL o MySQL para producción. El ORM de Django facilita el cambio.',
  },
  {
    icon: Code2,
    title: 'Interfaz responsiva',
    desc: 'HTML, CSS, JavaScript y Bootstrap para una experiencia consistente en cualquier dispositivo, desde móviles hasta escritorio.',
  },
  {
    icon: GitBranch,
    title: 'Escalabilidad',
    desc: 'Pensado para crecer con el negocio, manteniendo la facilidad de mantenimiento y permitiendo añadir módulos nuevos.',
  },
  {
    icon: Server,
    title: 'Despliegue flexible',
    desc: 'Compatible con VPS, servidores locales o servicios en la nube. Requiere solo Python y las dependencias del proyecto.',
  },
  {
    icon: Terminal,
    title: 'Migración sin fricción',
    desc: 'El ORM de Django permite cambiar de SQLite a PostgreSQL o MySQL actualizando una sola línea de configuración.',
  },
  {
    icon: Cloud,
    title: 'Respaldos automáticos',
    desc: 'La base de datos relacional permite implementar respaldos programados y políticas de retención de información.',
  },
  {
    icon: Cpu,
    title: 'Rendimiento optimizado',
    desc: 'Consultas eficientes mediante el ORM de Django, con índices y optimizaciones para manejar grandes volúmenes de datos.',
  },
];

export default function Tech() {
  const { ref, className } = useReveal<HTMLDivElement>('fade-left');

  return (
    <section id="tech" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left: description and architecture points */}
          <div ref={ref} className={className}>
            <span className="text-sm font-semibold uppercase tracking-wider text-amber-500">Tecnología</span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Construido sobre bases sólidas y escalables
            </h2>
            <p className="mt-4 text-slate-400">
              SIGIF utiliza Python y Django con una arquitectura monolítica que
              facilita el mantenimiento. La base de datos relacional permite
              migrar de SQLite a PostgreSQL o MySQL sin fricción.
            </p>

            <div className="mt-8 space-y-4">
              {architecturePoints.map((item, i) => (
                <TechRow key={item.title} {...item} delay={i * 70} />
              ))}
            </div>
          </div>

          {/* Right: tech stack grid */}
          <div className="lg:sticky lg:top-24">
            <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Stack tecnológico
            </div>
            <div className="grid grid-cols-2 gap-3">
              {techStack.map((t, i) => (
                <TechCard key={t.label} {...t} delay={i * 60} />
              ))}
            </div>

            {/* Code snippet mock */}
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-ink-950">
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="ml-2 text-xs text-slate-600">settings.py</span>
              </div>
              <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-400">
<span className="text-purple-400">DATABASES</span> = {'{'}
  <span className="text-amber-400">'default'</span>: {'{'}
    <span className="text-amber-400">'ENGINE'</span>: <span className="text-green-400">'django.db.backends.sqlite3'</span>,
    <span className="text-amber-400">'NAME'</span>: <span className="text-green-400">'db.sqlite3'</span>,
  {'}'}
{'}'}

<span className="text-slate-600"># Migrar a PostgreSQL:</span>
<span className="text-purple-400">DATABASES</span> = {'{'}
  <span className="text-amber-400">'default'</span>: {'{'}
    <span className="text-amber-400">'ENGINE'</span>: <span className="text-green-400">'django.db.backends.postgresql'</span>,
    <span className="text-amber-400">'NAME'</span>: <span className="text-green-400">'sigif_db'</span>,
    <span className="text-amber-400">'USER'</span>: <span className="text-green-400">'sigif_user'</span>,
    <span className="text-amber-400">'HOST'</span>: <span className="text-green-400">'localhost'</span>,
  {'}'}
{'}'}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechRow({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: typeof Database;
  title: string;
  desc: string;
  delay: number;
}) {
  const { ref, className } = useReveal<HTMLDivElement>('fade-left');
  return (
    <div
      ref={ref}
      className={`${className} flex gap-4 transition-all duration-300 hover:translate-x-1`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </div>
      <div>
        <h3 className="font-display text-sm font-semibold text-white">{title}</h3>
        <p className="mt-0.5 text-sm text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function TechCard({
  label,
  desc,
  version,
  delay,
}: {
  label: string;
  desc: string;
  version: string;
  delay: number;
}) {
  const { ref, className } = useReveal<HTMLDivElement>('scale-in');
  return (
    <div
      ref={ref}
      className={`${className} shine-on-hover rounded-xl border border-white/5 bg-ink-900/50 p-5 transition-all duration-300 hover:border-amber-500/20 hover:bg-ink-900 hover:-translate-y-1`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-amber-500" />
          <span className="font-display text-sm font-bold text-white">{label}</span>
        </div>
        {version !== '—' && (
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-500">
            {version}
          </span>
        )}
      </div>
      <p className="text-xs leading-relaxed text-slate-500">{desc}</p>
    </div>
  );
}
