import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { question: '¿Cómo se despliega SIGIF en la empresa?', answer: 'SIGIF es una aplicación monolítica desarrollada con Python y Django. Se despliega en un servidor web estándar (como un VPS o servidor local de la empresa). Solo necesitas instalar Python, las dependencias del proyecto y configurar el servidor web. El equipo de SIGIF puede asistir con el despliegue inicial.' },
  { question: '¿Puedo migrar la base de datos de SQLite a PostgreSQL?', answer: 'Sí. SIGIF utiliza el ORM de Django, lo que permite migrar de SQLite a PostgreSQL o MySQL sin necesidad de reescribir el código. Solo requiere actualizar la configuración de conexión y ejecutar las migraciones de Django sobre la nueva base de datos.' },
  { question: '¿Cómo funcionan los roles y permisos de usuario?', answer: 'SIGIF permite crear usuarios con diferentes roles (administrador, vendedor, bodeguero, etc.). Cada rol define qué módulos puede acceder, qué acciones puede realizar (ver, crear, editar, eliminar) y qué información puede consultar. Esto garantiza que cada miembro del equipo solo acceda a lo que necesita.' },
  { question: '¿El módulo de auditoría registra todas las acciones?', answer: 'Sí. El módulo de auditoría registra automáticamente cada acción relevante: creación, modificación o eliminación de productos, emisión de facturas, cambios de stock, accesos al sistema y modificaciones de configuración. Cada registro incluye quién realizó la acción, qué hizo y cuándo, proporcionando trazabilidad total.' },
  { question: '¿Qué capacitación necesita el equipo para usar SIGIF?', answer: 'SIGIF está diseñado para ser intuitivo y fácil de usar. La interfaz construida con Bootstrap es responsiva y familiar para cualquier usuario que haya usado sistemas web. Normalmente, una sesión de capacitación de 1-2 horas por rol es suficiente para que el equipo empiece a trabajar con el sistema.' },
  { question: '¿Cómo se protegen los datos sensibles de la empresa?', answer: 'SIGIF está pensado para uso interno, con autenticación obligatoria para acceder al sistema. Los roles limitan el acceso a información sensible. La auditoría registra cada acceso a datos críticos. Además, la base de datos relacional permite implementar respaldos automáticos y políticas de retención de información.' },
  { question: '¿Puede SIGIF integrarse con sistemas existentes?', answer: 'Al estar construido sobre Django, SIGIF puede exponer APIs REST para integrarse con otros sistemas de la empresa (contabilidad, CRM, logística). La arquitectura es flexible y permite agregar nuevos módulos o integraciones a medida que el negocio lo requiera.' },
  { question: '¿Qué soporte se ofrece después de la implementación?', answer: 'El soporte incluye mantenimiento del código, actualizaciones de seguridad, resolución de bugs y desarrollo de nuevas funcionalidades. Al ser un proyecto de código estructurado y documentado, cualquier desarrollador con conocimiento de Django puede dar mantenimiento al sistema.' },
];

export default function FAQ() {
  const { ref, className } = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div ref={ref} className={`${className} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-500">Preguntas frecuentes</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Resolvemos tus dudas</h2>
          <p className="mt-4 text-slate-400">
            Todo lo que necesitas saber sobre SIGIF antes de implementarlo en tu negocio.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`overflow-hidden rounded-xl border transition-all duration-300 ${isOpen ? 'border-amber-500/20 bg-ink-900/80' : 'border-white/5 bg-ink-900/50 hover:border-white/10'}`}>
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
        <span className={`font-display text-sm font-semibold transition-colors ${isOpen ? 'text-amber-400' : 'text-white'}`}>{question}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-400' : 'text-slate-500'}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">{answer}</p>
        </div>
      </div>
    </div>
  );
}
