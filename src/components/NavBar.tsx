import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from 'lucide-react'

export default function NavBar() {
  return (
    <nav className='sticky h-14 inset-x-0 z-30 w-full bottom-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span>kite.</span>
          </Link>

          <div className='hidden items-center space-x-4 sm:flex'>
            <>
              <Link
                href='/pricing'
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className:'text-black'
                })}>
                Pricing
              </Link>
              <LoginLink
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className:'text-black'
                })}>
                Sign in
              </LoginLink>
              <RegisterLink
                className={buttonVariants({
                  size: 'sm',
                })}>
                Get started{' '}
                <ArrowRight className='ml-1.5 h-5 w-5' />
              </RegisterLink>
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
