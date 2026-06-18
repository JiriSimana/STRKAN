'use client';

import { useState, useTransition } from 'react';
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import type { ActionState } from './server-action';

type Args<Schema extends z.ZodTypeAny> = {
  schema: Schema;
  action: (data: z.infer<Schema>) => Promise<ActionState>;
  defaultValues?: DefaultValues<z.infer<Schema>>;
  onSuccess?: (result: Extract<ActionState, { status: 'success' }>) => void;
};

export function useFormAction<Schema extends z.ZodTypeAny>({
  schema,
  action,
  defaultValues,
  onSuccess,
}: Args<Schema>) {
  type FormData = z.infer<Schema> extends FieldValues
    ? z.infer<Schema>
    : never;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionState>({ status: 'idle' });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      const res = await action(data as z.infer<Schema>);
      setResult(res);

      if (res.status === 'success') {
        onSuccess?.(res);
        form.reset();
      } else if (res.status === 'error' && res.fieldErrors) {
        for (const [field, errors] of Object.entries(res.fieldErrors)) {
          if (errors?.[0]) {
            form.setError(field as Path<FormData>, { message: errors[0] });
          }
        }
      }
    });
  });

  return {
    form,
    onSubmit,
    pending,
    result,
  };
}
