import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Seo } from '@/components/Seo';
import { SectionHeading } from '@/components/SectionHeading';
import { waLink } from '@/lib/whatsapp';
import { useState } from 'react';

interface FormData { name: string; email: string; message: string; }

export function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [sent, setSent] = useState(false);

  const onSubmit = (data: FormData) => {
    // demo only — no backend; opens WhatsApp with the message
    window.open(waLink(`Hi Maison Lumière 👋\n\nFrom: ${data.name} (${data.email})\n\n${data.message}`), '_blank');
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <Seo title="Contact" description="Reach the Maison Lumière concierge — we're here to help you choose and style." />
      <div className="container pt-28">
        <SectionHeading eyebrow="We'd love to hear from you" title="Get in touch" subtitle="Questions on sizing, styling or an order? Our concierge replies within hours." />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            {[
              { Icon: MapPin, t: 'Visit the studio', d: 'Beach Road, Visakhapatnam, Andhra Pradesh 530017' },
              { Icon: Phone, t: 'Call or WhatsApp', d: '+91 99999 99999' },
              { Icon: Mail, t: 'Email', d: 'concierge@maisonlumiere.in' },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="flex items-start gap-4 rounded-2xl bg-white/70 p-5 shadow-glass">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-cream"><Icon size={18} /></span>
                <div><p className="font-medium">{t}</p><p className="text-sm text-ink/60">{d}</p></div>
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social" className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 hover:bg-ink hover:text-cream transition"><Icon size={18} /></a>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl shadow-glass">
              <iframe
                title="Map"
                className="h-56 w-full grayscale"
                src="https://www.openstreetmap.org/export/embed.html?bbox=83.20%2C17.68%2C83.34%2C17.76&layer=mapnik"
                loading="lazy"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl bg-white/70 p-7 shadow-soft">
            <h3 className="font-display text-2xl">Send a message</h3>
            <div className="mt-6 space-y-4">
              <div>
                <input {...register('name', { required: 'Please enter your name' })} placeholder="Your name" className="field" />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
              </div>
              <div>
                <input {...register('email', { required: 'Please enter your email', pattern: { value: /^\S+@\S+$/, message: 'Enter a valid email' } })} placeholder="Email address" className="field" />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <textarea {...register('message', { required: 'Please write a message' })} rows={5} placeholder="How can we help?" className="field resize-none" />
                {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
              </div>
              <Button type="submit" className="w-full" size="lg"><Send size={17} /> Send via WhatsApp</Button>
              {sent && <p className="text-center text-sm text-green-700">Opening WhatsApp — thank you!</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
