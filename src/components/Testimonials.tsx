import { useEffect, useState, useCallback } from 'react';
import { useReveal } from '../hooks/useReveal';
import { supabase } from '../lib/supabase';
import { Star, ChevronLeft, ChevronRight, Quote, Loader2 } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  display_order: number;
}

const fallbackTestimonials: Testimonial[] = [
  { id: '1', name: 'Carlos Mendoza', role: 'Jefe de Taller', company: 'MotoRepuestos del Valle', content: 'Desde que implementamos SIGIF, el control del inventario se volvió mucho más preciso. Ya no perdemos piezas ni tenemos ventas sin registrar. El módulo de auditoría nos da tranquilidad total.', rating: 5, display_order: 1 },
  { id: '2', name: 'Laura Gutiérrez', role: 'Administradora', company: 'Repuestos La 80', content: 'La facturación integrada al inventario nos ahorra horas de trabajo manual. Cada venta descuenta el stock automáticamente. Es exactamente lo que necesitábamos para el negocio.', rating: 5, display_order: 2 },
  { id: '3', name: 'Andrés Ramírez', role: 'Gerente', company: 'MotoCentro Premium', content: 'Los roles de usuario nos permiten controlar quién puede ver y modificar qué. El sistema es seguro, fácil de usar y el equipo lo adoptó sin problemas. La mejor decisión para la empresa.', rating: 5, display_order: 3 },
  { id: '4', name: 'María Fernanda López', role: 'Vendedora', company: 'Importadora Motocross', content: 'El carrito de compras integrado hace que las ventas sean rápidas. Puedo atender a un cliente en menos de la mitad del tiempo que antes. El historial de movimientos es muy útil.', rating: 5, display_order: 4 },
  { id: '5', name: 'Diego Torres', role: 'Propietario', company: 'MotoHouse', content: 'SIGIF centralizó toda la información del negocio. Antes teníamos todo en hojas de cálculo, ahora todo está en un solo sistema. La toma de decisiones es mucho más ágil.', rating: 5, display_order: 5 },
];

export default function Testimonials() {
  const { ref, className } = useReveal<HTMLDivElement>();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('display_order', { ascending: true });
        if (!cancelled && !error && data && data.length > 0) {
          setTestimonials(data as Testimonial[]);
        } else if (!cancelled) {
          setTestimonials(fallbackTestimonials);
        }
      } catch {
        if (!cancelled) setTestimonials(fallbackTestimonials);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), [testimonials.length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length), [testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, testimonials.length]);

  const initials = (name: string) => name.split(' ').map((n) => n[0]).slice(0, 2).join('');

  return (
    <section id="testimonials" className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-amber-500/5 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-6">
        <div ref={ref} className={`${className} mx-auto max-w-2xl text-center`}>
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-500">Testimonios</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Lo que dicen quienes ya usan SIGIF
          </h2>
        </div>

        {loading ? (
          <div className="mt-16 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
          </div>
        ) : testimonials.length > 0 ? (
          <div className="mt-12">
            <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-ink-900/50 p-8 md:p-10">
              <Quote className="absolute right-6 top-6 h-10 w-10 text-amber-500/10" />
              <div className="relative min-h-[200px]">
                {testimonials.map((t, i) => (
                  <div
                    key={t.id}
                    className={`absolute inset-0 transition-all duration-500 ease-out ${
                      i === current ? 'opacity-100 translate-x-0' : i < current ? 'opacity-0 -translate-x-8 pointer-events-none' : 'opacity-0 translate-x-8 pointer-events-none'
                    }`}
                  >
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-lg leading-relaxed text-slate-300">"{t.content}"</p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 font-display text-sm font-bold text-ink-950">
                        {initials(t.name)}
                      </div>
                      <div>
                        <div className="font-display text-sm font-semibold text-white">{t.name}</div>
                        <div className="text-xs text-slate-500">{t.role} · {t.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-amber-500/30 hover:text-amber-400" aria-label="Anterior">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((t, i) => (
                  <button key={t.id} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-amber-500' : 'w-2 bg-white/20 hover:bg-white/40'}`} aria-label={`Testimonio ${i + 1}`} />
                ))}
              </div>
              <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-amber-500/30 hover:text-amber-400" aria-label="Siguiente">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
