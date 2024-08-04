'use client';

import { Button } from '@/components/ui/button';
import React, { FC } from 'react';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const SubmitButton: FC<SubmitButtonProps> = ({ children }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {children}
    </Button>
  );
};

export default SubmitButton;
