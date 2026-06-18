'use client';

import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Input } from '@/components/primitives/Input';
import { Button } from '@/components/primitives/Button';
import { Checkbox } from '@/components/primitives/Checkbox';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { FormField } from '@/components/forms/FormField';
import { FieldError } from '@/components/primitives/FieldError';
import { newsletterSchema } from '@/lib/forms/schemas';
import { useFormAction } from '@/lib/forms/use-form-action';
import { submitNewsletter } from '@/lib/forms/actions';

type Props = {
  variant?: 'default' | 'dark';
};

export function NewsletterInline({ variant = 'default' }: Props) {
  const t = useTranslations('Newsletter');
  const { form, onSubmit, pending, result } = useFormAction({
    schema: newsletterSchema,
    action: submitNewsletter,
    defaultValues: { email: '', consent: false as never, turnstileToken: '' },
  });

  const isDark = variant === 'dark';

  return (
    <section
      className={isDark ? 'bg-ink text-paper py-24' : 'bg-mist text-ink py-24'}
    >
      <Container>
        <div className="mx-auto max-w-2xl">
          <Eyebrow variant={isDark ? 'azure' : 'azure'} className="block mb-4">
            {t('eyebrow')}
          </Eyebrow>
          <h2
            className={`type-display-md ${isDark ? 'text-paper' : 'text-ink'}`}
          >
            {t('title')}
          </h2>
          <p
            className={`mt-4 type-body ${isDark ? 'text-paper/70' : 'text-steel'}`}
          >
            {t('description')}
          </p>

          {result.status === 'success' ? (
            <p
              role="status"
              className={`mt-8 p-4 border ${isDark ? 'border-azure/40 text-azure' : 'border-success text-success'}`}
            >
              {result.message}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
              <FormField
                label={t('email')}
                required
                error={form.formState.errors.email?.message}
              >
                {({ id, 'aria-describedby': describedBy }) => (
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-fog pointer-events-none"
                        aria-hidden
                      />
                      <Input
                        id={id}
                        type="email"
                        autoComplete="email"
                        placeholder="vy@firma.cz"
                        aria-describedby={describedBy}
                        className="pl-11"
                        error={!!form.formState.errors.email}
                        {...form.register('email')}
                      />
                    </div>
                    <Button type="submit" loading={pending}>
                      {t('submit')}
                    </Button>
                  </div>
                )}
              </FormField>

              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={form.watch('consent') === true}
                  onCheckedChange={(checked) =>
                    form.setValue('consent', checked === true ? true : (false as never))
                  }
                />
                <span
                  className={`type-body-sm ${isDark ? 'text-paper/70' : 'text-steel'}`}
                >
                  {t('consent')}
                </span>
              </label>
              {form.formState.errors.consent && (
                <FieldError>
                  {form.formState.errors.consent.message}
                </FieldError>
              )}

              {result.status === 'error' && (
                <p role="alert" className="type-body-sm text-error">
                  {result.message}
                </p>
              )}
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
