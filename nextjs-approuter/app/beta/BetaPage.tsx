'use client'

import { HomePageLink } from './components/HomePageLink'
import WelcomeMessage from '../components/WelcomeMessage'

/**
 * This page is a client component that displays a welcome message to beta users.
 *
 * @returns {React.ReactNode}
 */
export const BetaPage = () => {
  return (
    <main className={'main'}>
      <div>
        <h1>Welcome to the Beta! 🎉</h1>
        <p>
          This page is restricted to beta users only.
          <br />
          Looks like you have access!
          <br />
          <br />
        </p>
        {/**
         * Since this is a client component, we can include the WelcomeMessage
         * component here. Otherwise, we would encounter an error.
         */}
        <WelcomeMessage />
        <HomePageLink />
      </div>
    </main>
  )
}
