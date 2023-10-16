"use client"

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function page() {

  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');
  
  return (
    <div></div>
  )
}

