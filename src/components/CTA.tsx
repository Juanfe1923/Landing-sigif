import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { supabase } from '../lib/supabase';
import { ArrowRight, Mail, Boxes, User, Building2, MessageSquare, Loader2, CheckCircle2, Sparkles } from 'lucide-react';

interface CTAProps {
  onToast: (type: 'success' | 'error', message: string) => void;
}

const fieldAnimations = [
  { delay: '100ms' },
  { delay: '200ms' },
  { delay: '300ms' },
  { delay: '400ms' },
];

export default function CTA({ onToast }: CTAProps) {
  const { ref, className } = useReveal<HTMLDivElement>('scale-in');
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
      setTimeout(() => setSubmitted(false), 4000);
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
    <section id="contacto" className="relative overflow-hidden pb-24 pt-2">
      <div className="mx-auto max-w-4xl px-6">
        <div
          ref={ref}
          className={`${className} relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-ink-900/90 to-ink-800/90 p-8 md:p-10 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-500`}
        >
          {/* Animated gradient border overlay */}
          <div className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          <div className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 animate-gradient-shift -z-10"
            style={{
              background: 'linear-gradient(60deg, transparent 40%, rgba(245,158,11,0.15) 50%, transparent 60%)',
              backgroundSize: '200% 200%',
            }}
          />

          {/* Background blobs */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/10 blur-2xl animate-drift" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-500/8 blur-2xl animate-drift-slow" />

          <div className="relative">
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20 animate-float">
              <Boxes className="h-5 w-5 text-ink-950" strokeWidth={2.5} />
            </div>
            <h2 className="text-center font-display text-2xl font-bold text-white sm:text-3xl">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm text-slate-400">
              Solicita una demostración personalizada y descubre cómo SIGIF puede
              centralizar tu inventario, facturación y ventas.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-xl space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField
                  icon={User}
                  name="name"
                  placeholder="Nombre completo"
                  value={form.name}
                  onChange={(v) => update('name', v)}
                  error={errors.name}
                  delay={fieldAnimations[0].delay}
                  isFocused={focusedField === 'name'}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
                <FormField
                  icon={Mail}
                  name="email"
                  type="email"
                  placeholder="tu@empresa.com"
                  value={form.email}
                  onChange={(v) => update('email', v)}
                  error={errors.email}
                  delay={fieldAnimations[1].delay}
                  isFocused={focusedField === 'email'}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <FormField
                  icon={Building2}
                  name="company"
                  placeholder="Empresa (opcional)"
                  value={form.company}
                  onChange={(v) => update('company', v)}
                  delay={fieldAnimations[2].delay}
                  isFocused={focusedField === 'company'}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                />
                <div style={{ animationDelay: fieldAnimations[3].delay }} className="animate-fade-up opacity-0">
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 text-slate-500" />
                    <textarea
                      name="message"
                      rows={2}
                      placeholder="Mensaje (opcional)"
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full resize-none rounded-lg border bg-ink-950/60 py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 ${
                        focusedField === 'message' ? 'border-amber-500/50 shadow-lg shadow-amber-500/10 scale-[1.01]' : 'border-white/10'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="animate-fade-up opacity-0" style={{ animationDelay: '500ms' }}>
                <button
                  type="submit"
                  disabled={loading || submitted}
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-semibold text-ink-950 transition-all duration-300 hover:from-amber-400 hover:to-amber-500 hover:shadow-xl hover:shadow-amber-500/30 disabled:opacity-70 active:scale-[0.98]"
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</>
                  ) : submitted ? (
                    <span className="inline-flex items-center gap-2 animate-confetti-drop">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>¡Solicitud enviada!</span>
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                    </span>
                  ) : (
                    <>Solicitar demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
                  )}
                </button>
              </div>
            </form>
            <p className="mt-3 text-center text-xs text-slate-600">
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
  delay,
  isFocused,
  onFocus,
  onBlur,
}: {
  icon: typeof User;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  delay?: string;
  isFocused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  return (
    <div className="animate-fade-up opacity-0" style={{ animationDelay: delay }}>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`w-full rounded-lg border bg-ink-950/60 py-2.5 pl-9 pr-3 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 ${
            error
              ? 'border-red-500/50'
              : isFocused
                ? 'border-amber-500/50 shadow-lg shadow-amber-500/10 scale-[1.01]'
                : 'border-white/10 hover:border-white/20'
          }`}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

