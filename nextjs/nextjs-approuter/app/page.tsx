'use client'

import Image from 'next/image'
import Logo from '@/app/components/Logo'
import WelcomeMessage from '@/app/components/WelcomeMessage'
export default function Home() {
  return (
    <main className={'main'}>
      <WelcomeMessage />
      <div className={'d-flex gap-4 text-center logo-container flex-column'}>
        <Image
          className={'logo'}
          src='/next.svg'
          alt='Next.js Logo'
          width={180}
          height={37}
          priority
        />
        <Logo />
      </div>

      <div className='d-flex justify-content-start align-items-start flex-row gap-5'>
        <a
          className='card'
          href='https://docs.flagsmith.com/clients/next-ssr'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2>
            Flagsmith Docs <span>-&gt;</span>
          </h2>
          <p className='fs-sm text-muted'>
            Find out how to use Flagsmith
            <br /> with Next.js
          </p>
        </a>
        <a
          className='card'
          href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2>
            Next.js Docs <span>-&gt;</span>
          </h2>
          <p className='fs-sm text-muted'>
            Find in-depth information
            <br />
            about Next.js features and API.
          </p>
        </a>
      </div>
    </main>
  )
}
