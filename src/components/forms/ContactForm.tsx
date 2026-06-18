'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/primitives/Input';
import { Textarea } from '@/components/primitives/Textarea';
import { Checkbox } from '@/components/primitives/Checkbox';
import { Button } from '@/components/primitives/Button';
import { FieldError } from '@/components/primitives/FieldError';
import { FormField } from '@/components/forms/FormField';
import { contactSchema } from '@/lib/forms/schemas';
import { useFormAction } from '@/lib/forms/use-form-action';
import { submitContact } from '@/lib/forms/actions';
import { cn } from '@/lib/utils/cn';

export function ContactForm({ className }: { className?: string }) {
  const t = useTranslations('Contact.form');
  const { form, onSubmit, pending, result } = useFormAction({
    schema: contactSchema,
    action: submitContact,
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      consent: false as never,
      turnstileToken: '',
    },
  });

  if (result.status === 'success') {
    return (
      <div
        role="status"
        className={cn(
          'border border-success bg-success/5 p-6 type-body text-ink',
          className,
        )}
      >
        {result.message}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn('flex flex-col gap-5', className)}>
      <FormField
        label={t('name')}
        required
        error={form.formState.errors.name?.message}
      >
        {(p) => (
          <Input
            {...p}
            autoComplete="name"
            error={!!form.formState.errors.name}
            {...form.register('name')}
          />
        )}
      </FormField>

      <FormField
        label={t('email')}
        required
        error={form.formState.errors.email?.message}
      >
        {(p) => (
          <Input
            {...p}
            type="email"
            autoComplete="email"
            error={!!form.formState.errors.email}
            {...form.register('email')}
          />
        )}
      </FormField>

      <FormField
        label={t('subject')}
        required
        error={form.formState.errors.subject?.message}
      >
        {(p) => (
          <Input
            {...p}
            error={!!form.formState.errors.subject}
            {...form.register('subject')}
          />
        )}
      </FormField>

      <FormField
        label={t('message')}
        required
        error={form.formState.errors.message?.message}
      >
        {(p) => (
          <Textarea
            {...p}
            rows={6}
            error={!!form.formState.errors.message}
            {...form.register('message')}
          />
        )}
      </FormField>

      <label className="flex items-start gap-3 cursor-pointer">
        <Checkbox
          checked={form.watch('consent') === true}
          onCheckedChange={(checked) =>
            form.setValue('consent', checked === true ? true : (false as never))
          }
        />
        <span className="type-body-sm text-steel">{t('consent')}</span>
      </label>
      {form.formState.errors.consent && (
        <FieldError>{form.formState.errors.consent.message}</FieldError>
      )}

      {result.status === 'error' && (
        <p role="alert" className="type-body-sm text-error">
          {result.message}
        </p>
      )}

      <div>
        <Button type="submit" size="lg" loading={pending}>
          {t('submit')}
        </Button>
      </div>
    </form>
  );
}
