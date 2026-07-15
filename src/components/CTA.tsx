import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { supabase } from '../lib/supabase';
import { ArrowRight, Mail, Boxes, User, Building2, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';

interface CTAProps {
  onToast: (type: 'success' | 'error', message: string) => void;
}

export default function CTA({ onToast }: CTAProps) {
  const { ref, className } = useReveal<HTMLDivElement>('scale-in');
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'El nombre es obligatorio';
    if (!form.email.trim()) {
      e.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Ingresa un correo válido';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('demo_requests').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || null,
        message: form.message.trim() || null,
      });
      if (error) throw error;
      onToast('success', 'Solicitud enviada. Te contactaremos pronto para coordinar la demo.');
      setForm({ name: '', email: '', company: '', message: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      onToast('error', 'No se pudo enviar la solicitud. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <section id="contacto" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div ref={ref} className={`${className} relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-ink-900 to-ink-800 p-10 md:p-16`}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/15 blur-3xl animate-drift" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl animate-drift-slow" />

          <div className="relative">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20">
              <Boxes className="h-7 w-7 text-ink-950" strokeWidth={2.5} />
            </div>
            <h2 className="text-center font-display text-3xl font-bold text-white sm:text-4xl">
              Lleva el control de tu negocio al siguiente nivel
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
              Solicita una demostración de SIGIF y descubre cómo centralizar
              inventario, facturación y ventas en una sola plataforma.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-lg space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField icon={User} name="name" placeholder="Nombre completo" value={form.name} onChange={(v) => update('name', v)} error={errors.name} />
                <FormField icon={Mail} name="email" type="email" placeholder="tu@empresa.com" value={form.email} onChange={(v) => update('email', v)} error={errors.email} />
              </div>
              <FormField icon={Building2} name="company" placeholder="Empresa (opcional)" value={form.company} onChange={(v) => update('company', v)} />
              <div>
                <div className="relative">
                  <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Cuéntanos sobre tu negocio (opcional)"
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="w-full resize-none rounded-lg border border-white/10 bg-ink-950/60 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-amber-500/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || submitted}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-70"
              >
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</>
                ) : submitted ? (
                  <><CheckCircle2 className="h-4 w-4" /> ¡Solicitud enviada!</>
                ) : (
                  <>Solicitar demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                )}
              </button>
            </form>
            <p className="mt-4 text-center text-xs text-slate-600">
              Sin compromiso. Te contactaremos para coordinar una demostración personalizada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  icon: Icon,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}: {
  icon: typeof User;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-lg border bg-ink-950/60 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none transition-colors ${error ? 'border-red-500/50' : 'border-white/10 focus:border-amber-500/50'}`}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
