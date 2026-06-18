'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Input } from '@/components/primitives/Input';
import { Textarea } from '@/components/primitives/Textarea';
import { Button } from '@/components/primitives/Button';
import { Checkbox } from '@/components/primitives/Checkbox';
import { Eyebrow } from '@/components/primitives/Eyebrow';
import { FieldError } from '@/components/primitives/FieldError';
import { FormField } from '@/components/forms/FormField';
import { configuratorSchema, SEGMENTS, TIMELINES } from '@/lib/forms/schemas';
import { useFormAction } from '@/lib/forms/use-form-action';
import { submitConfigurator } from '@/lib/forms/actions';
import { cn } from '@/lib/utils/cn';
import { SERVICE_SEGMENTS } from '@/content/services';

const STEPS = ['segment', 'parameters', 'timeline', 'contact'] as const;

export function Configurator() {
  const t = useTranslations('Configurator');
  const tSeg = useTranslations('ServiceSegments');

  const { form, onSubmit, pending, result } = useFormAction({
    schema: configuratorSchema,
    action: submitConfigurator,
    defaultValues: {
      segment: 'dopravni-technika',
      parameters: {},
      timeline: 'do-1-mesice',
      contact: {
        company: '',
        name: '',
        role: '',
        email: '',
        phone: '',
      },
      consent: false as never,
      turnstileToken: '',
    },
  });

  const [step, setStep] = useState<(typeof STEPS)[number]>('segment');
  const stepIndex = STEPS.indexOf(step);

  if (result.status === 'success') {
    return (
      <Container size="narrow" className="py-24 lg:py-32 text-center">
        <Check className="mx-auto size-16 text-success" strokeWidth={1.5} aria-hidden />
        <h1 className="mt-8 type-display-md text-ink">{t('success.title')}</h1>
        <p className="mt-6 type-body-lg text-steel max-w-xl mx-auto">
          {result.message}
        </p>
        <p className="mt-8 type-eyebrow text-fog">
          {t('success.referenceCode')}: {(result.data?.referenceCode as string) ?? '—'}
        </p>
      </Container>
    );
  }

  const next = () => {
    const order = STEPS;
    const i = order.indexOf(step);
    if (i < order.length - 1) setStep(order[i + 1]);
  };
  const back = () => {
    const order = STEPS;
    const i = order.indexOf(step);
    if (i > 0) setStep(order[i - 1]);
  };

  return (
    <Container size="narrow" className="py-12 lg:py-16">
      <Progress current={stepIndex} t={t} />

      <form onSubmit={onSubmit} className="mt-12 flex flex-col gap-8">
        {step === 'segment' && (
          <fieldset className="flex flex-col gap-6">
            <legend className="type-display-md text-ink">{t('steps.segment.title')}</legend>
            <p className="type-body text-steel">{t('steps.segment.subtitle')}</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {SEGMENTS.map((seg) => {
                const isStaticSeg = (SERVICE_SEGMENTS as readonly string[]).includes(seg);
                const label = isStaticSeg
                  ? tSeg(`${seg}.title`)
                  : t('otherSegment');
                const selected = form.watch('segment') === seg;
                return (
                  <li key={seg}>
                    <button
                      type="button"
                      onClick={() =>
                        form.setValue('segment', seg, { shouldDirty: true })
                      }
                      className={cn(
                        'w-full h-32 p-6 border text-left type-heading-md transition-all',
                        selected
                          ? 'bg-ink text-paper border-ink'
                          : 'bg-paper text-ink border-cloud hover:border-azure-deep',
                      )}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        )}

        {step === 'parameters' && (
          <fieldset className="flex flex-col gap-6">
            <legend className="type-display-md text-ink">{t('steps.parameters.title')}</legend>
            <p className="type-body text-steel">{t('steps.parameters.subtitle')}</p>
            <FormField label={t('steps.parameters.description')}>
              {(p) => (
                <Textarea
                  {...p}
                  rows={8}
                  placeholder={t('steps.parameters.placeholder')}
                  onChange={(e) =>
                    form.setValue('parameters', { description: e.target.value })
                  }
                />
              )}
            </FormField>
          </fieldset>
        )}

        {step === 'timeline' && (
          <fieldset className="flex flex-col gap-6">
            <legend className="type-display-md text-ink">{t('steps.timeline.title')}</legend>
            <p className="type-body text-steel">{t('steps.timeline.subtitle')}</p>
            <div className="flex flex-wrap gap-3">
              {TIMELINES.map((tl) => {
                const selected = form.watch('timeline') === tl;
                return (
                  <button
                    key={tl}
                    type="button"
                    onClick={() => form.setValue('timeline', tl, { shouldDirty: true })}
                    className={cn(
                      'h-12 px-5 type-body border transition-colors',
                      selected
                        ? 'bg-ink text-paper border-ink'
                        : 'bg-paper text-ink border-cloud hover:border-azure-deep',
                    )}
                  >
                    {t(`timelines.${tl}`)}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 'contact' && (
          <fieldset className="flex flex-col gap-5">
            <legend className="type-display-md text-ink">{t('steps.contact.title')}</legend>
            <p className="type-body text-steel">{t('steps.contact.subtitle')}</p>

            <FormField
              label={t('contact.company')}
              required
              error={form.formState.errors.contact?.company?.message}
            >
              {(p) => (
                <Input
                  {...p}
                  error={!!form.formState.errors.contact?.company}
                  {...form.register('contact.company')}
                />
              )}
            </FormField>

            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label={t('contact.name')}
                required
                error={form.formState.errors.contact?.name?.message}
              >
                {(p) => (
                  <Input
                    {...p}
                    autoComplete="name"
                    error={!!form.formState.errors.contact?.name}
                    {...form.register('contact.name')}
                  />
                )}
              </FormField>
              <FormField
                label={t('contact.role')}
                required
                error={form.formState.errors.contact?.role?.message}
              >
                {(p) => (
                  <Input
                    {...p}
                    error={!!form.formState.errors.contact?.role}
                    {...form.register('contact.role')}
                  />
                )}
              </FormField>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label={t('contact.email')}
                required
                error={form.formState.errors.contact?.email?.message}
              >
                {(p) => (
                  <Input
                    {...p}
                    type="email"
                    autoComplete="email"
                    error={!!form.formState.errors.contact?.email}
                    {...form.register('contact.email')}
                  />
                )}
              </FormField>
              <FormField
                label={t('contact.phone')}
                required
                error={form.formState.errors.contact?.phone?.message}
              >
                {(p) => (
                  <Input
                    {...p}
                    type="tel"
                    autoComplete="tel"
                    error={!!form.formState.errors.contact?.phone}
                    {...form.register('contact.phone')}
                  />
                )}
              </FormField>
            </div>

            <label className="flex items-start gap-3 cursor-pointer mt-2">
              <Checkbox
                checked={form.watch('consent') === true}
                onCheckedChange={(checked) =>
                  form.setValue(
                    'consent',
                    checked === true ? true : (false as never),
                  )
                }
              />
              <span className="type-body-sm text-steel">{t('consent')}</span>
            </label>
            {form.formState.errors.consent && (
              <FieldError>{form.formState.errors.consent.message}</FieldError>
            )}

            {result.status === 'error' && (
              <p role="alert" className="type-body-sm text-error mt-2">
                {result.message}
              </p>
            )}
          </fieldset>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-cloud pt-8">
          {stepIndex > 0 ? (
            <Button
              type="button"
              variant="ghost"
              onClick={back}
              icon={<ArrowLeft className="size-4" />}
              iconPosition="left"
            >
              {t('nav.back')}
            </Button>
          ) : (
            <span />
          )}

          {step !== 'contact' ? (
            <Button
              type="button"
              onClick={next}
              icon={<ArrowRight className="size-4" />}
              iconPosition="right"
            >
              {t('nav.next')}
            </Button>
          ) : (
            <Button type="submit" size="lg" loading={pending}>
              {t('nav.submit')}
            </Button>
          )}
        </div>
      </form>
    </Container>
  );
}

function Progress({
  current,
  t,
}: {
  current: number;
  t: ReturnType<typeof useTranslations<'Configurator'>>;
}) {
  return (
    <div>
      <Eyebrow variant="azure" className="block mb-3">
        {t('progress.label', { current: current + 1, total: STEPS.length })}
      </Eyebrow>
      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1',
              i <= current ? 'bg-azure' : 'bg-cloud',
            )}
          />
        ))}
      </div>
    </div>
  );
}
