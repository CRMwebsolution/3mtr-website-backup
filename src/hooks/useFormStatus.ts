import { useState } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function useFormStatus() {
  const [status, setStatus] = useState<FormStatus>('idle');
  
  return {
    status,
    setStatus,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    isError: status === 'error'
  };
}