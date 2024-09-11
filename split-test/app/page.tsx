'use client'

import Image from 'next/image'
import Logo from '@/app/components/Logo'
import WelcomeMessage from '@/app/components/WelcomeMessage'
export default function Home() {
  return (
    <main className={'main'}>
      <WelcomeMessage />
      <div className={'d-flex gap-4 text-center logo-container flex-column'}>
        <Logo />
        <div>
          <h2 className='mb-0'>Split Testing Example App</h2>
          <p>Login as any user and track example conversion events</p>
        </div>
      </div>

      <div className='d-flex justify-content-start align-items-start flex-row gap-5'>
        <a
          className='card'
          href='https://docs.flagsmith.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2>
            Flagsmith Docs <span>-&gt;</span>
          </h2>
          <p className='fs-sm text-muted'>Find out how to use Flagsmith</p>
        </a>
      </div>
    </main>
  )
}
