'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/primitives/Input';
import { Textarea } from '@/components/primitives/Textarea';
import { Checkbox } from '@/components/primitives/Checkbox';
import { Button } from '@/components/primitives/Button';
import { FieldError } from '@/components/primitives/FieldError';
import { FormField } from '@/components/forms/FormField';
import { jobApplicationSchema } from '@/lib/forms/schemas';
import { useFormAction } from '@/lib/forms/use-form-action';
import { submitJobApplication } from '@/lib/forms/actions';
import { cn } from '@/lib/utils/cn';

type Props = {
  vacancySlug: string;
  className?: string;
};

export function ApplyForm({ vacancySlug, className }: Props) {
  const t = useTranslations('VacancyDetail.applyForm');
  const { form, onSubmit, pending, result } = useFormAction({
    schema: jobApplicationSchema,
    action: submitJobApplication,
    defaultValues: {
      vacancySlug,
      fullName: '',
      email: '',
      phone: '',
      cvUrl: '',
      linkedinUrl: '',
      motivation: '',
      consentGdpr: false as never,
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
    <form onSubmit={onSubmit} className={cn('flex flex-col gap-6', className)}>
      <FormField
        label={t('fullName')}
        required
        error={form.formState.errors.fullName?.message}
      >
        {(p) => (
          <Input
            {...p}
            autoComplete="name"
            error={!!form.formState.errors.fullName}
            {...form.register('fullName')}
          />
        )}
      </FormField>

      <div className="grid gap-6 md:grid-cols-2">
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
          label={t('phone')}
          error={form.formState.errors.phone?.message}
        >
          {(p) => (
            <Input
              {...p}
              type="tel"
              autoComplete="tel"
              error={!!form.formState.errors.phone}
              {...form.register('phone')}
            />
          )}
        </FormField>
      </div>

      <FormField
        label={t('cvUrl')}
        required
        hint={t('cvUrlHint')}
        error={form.formState.errors.cvUrl?.message}
      >
        {(p) => (
          <Input
            {...p}
            type="url"
            placeholder="https://"
            error={!!form.formState.errors.cvUrl}
            {...form.register('cvUrl')}
          />
        )}
      </FormField>

      <FormField
        label={t('linkedinUrl')}
        error={form.formState.errors.linkedinUrl?.message}
      >
        {(p) => (
          <Input
            {...p}
            type="url"
            placeholder="https://linkedin.com/in/"
            error={!!form.formState.errors.linkedinUrl}
            {...form.register('linkedinUrl')}
          />
        )}
      </FormField>

      <FormField
        label={t('motivation')}
        error={form.formState.errors.motivation?.message}
      >
        {(p) => (
          <Textarea
            {...p}
            rows={5}
            error={!!form.formState.errors.motivation}
            {...form.register('motivation')}
          />
        )}
      </FormField>

      <label className="flex items-start gap-3 cursor-pointer">
        <Checkbox
          checked={form.watch('consentGdpr') === true}
          onCheckedChange={(checked) =>
            form.setValue('consentGdpr', checked === true ? true : (false as never))
          }
        />
        <span className="type-body-sm text-steel">{t('consent')}</span>
      </label>
      {form.formState.errors.consentGdpr && (
        <FieldError>{form.formState.errors.consentGdpr.message}</FieldError>
      )}

      {result.status === 'error' && (
        <p role="alert" className="type-body-sm text-error">
          {result.message}
        </p>
      )}

      <div className="flex">
        <Button type="submit" size="lg" loading={pending}>
          {t('submit')}
        </Button>
      </div>

      {/* TODO(infra): CV upload to Supabase Storage cv-uploads — currently
          accepts an external URL string. Wire a Server Action that streams
          the file from a FormData to Storage and returns a signed URL,
          then plug it into setValue('cvUrl', ...) here. */}
    </form>
  );
}
