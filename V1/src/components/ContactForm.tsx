'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      segment: formData.get('segment'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Něco se pokazilo, zkuste to prosím znovu.');
      }

      setFormStatus({ type: 'success', message: 'Vaše zpráva byla úspěšně odeslána. Brzy se vám ozveme.' });
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setFormStatus({ type: 'error', message: err instanceof Error ? err.message : 'Nastala chyba při odesílání.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {formStatus && (
        <div className={`p-4 font-bold border ${formStatus.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
          {formStatus.message}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-brand-dark-blue mb-2" htmlFor="segment">
          Oblast zájmu
        </label>
        <select 
          id="segment" 
          name="segment"
          required
          className="w-full h-12 px-4 border border-brand-gray/30 bg-white focus:outline-none focus:border-brand-sky-blue focus:ring-1 focus:ring-brand-sky-blue rounded-none"
        >
          <option value="Dopravní technika">Dopravní technika</option>
          <option value="Servis">Servis</option>
          <option value="Výroba">Výroba</option>
          <option value="Kariéra">Kariéra</option>
          <option value="Jiné">Jiné</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-brand-dark-blue mb-2" htmlFor="name">Jméno a příjmení</label>
          <input type="text" id="name" name="name" required className="w-full h-12 px-4 border border-brand-gray/30 bg-white focus:outline-none focus:border-brand-sky-blue focus:ring-1 focus:ring-brand-sky-blue rounded-none" />
        </div>
        <div>
          <label className="block text-sm font-bold text-brand-dark-blue mb-2" htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required className="w-full h-12 px-4 border border-brand-gray/30 bg-white focus:outline-none focus:border-brand-sky-blue focus:ring-1 focus:ring-brand-sky-blue rounded-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-brand-dark-blue mb-2" htmlFor="message">Zpráva</label>
        <textarea id="message" name="message" required rows={5} className="w-full p-4 border border-brand-gray/30 bg-white focus:outline-none focus:border-brand-sky-blue focus:ring-1 focus:ring-brand-sky-blue rounded-none"></textarea>
      </div>

      <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Odesílání...' : 'Odeslat dotaz'}
      </Button>
    </form>
  );
}
