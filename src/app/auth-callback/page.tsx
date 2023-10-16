"use client"

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import React from 'react'
import { trpc } from '../_trpc/client';

export default function page() {

  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  const { data, isLoading } = trpc.authCallback.useQuery(undefined,{
    onSuccess: ({success}) => {
      if (success) {
        router.push(`/${origin?origin:'dashboard'}`);
      }
    }
  });
  
  return (
    <div></div>
  )
}

