import { Boxes } from 'lucide-react';

const sections = [
  {
    title: 'Sistema',
    links: [
      { label: 'Características', href: '#features' },
      { label: 'Módulos', href: '#modules' },
      { label: 'Tecnología', href: '#tech' },
      { label: 'Seguridad', href: '#security' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Testimonios', href: '#testimonials' },
      { label: 'Preguntas frecuentes', href: '#faq' },
      { label: 'Solicitar demo', href: '#contacto' },
    ],
  },
  {
    title: 'Módulos',
    links: [
      { label: 'Inventario', href: '#modules' },
      { label: 'Facturación', href: '#modules' },
      { label: 'Clientes', href: '#modules' },
      { label: 'Auditoría', href: '#modules' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-ink-950 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600">
                <Boxes className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-extrabold text-white">SIGIF</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Sistema Integrado de Gestión de Inventario y Facturación para
              empresas de repuestos para motocicletas.
            </p>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="font-display text-sm font-semibold text-white">{s.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-slate-500 transition-colors hover:text-amber-400">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} SIGIF. Sistema de uso interno. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-600">
            Desarrollado con Python · Django · Bootstrap
          </p>
        </div>
      </div>
    </footer>
  );
}
