import { HomePageLink } from './components/HomePageLink'

/**
 * This page is a server component that displays a message to non-beta users.
 * Since there's no need for client-side interactivity, we can simply return
 * the HTML.
 *
 * @returns {React.ReactNode}
 */
export const RestrictedPage = () => {
  return (
    <main className='main'>
      <div>
        <h1>Restricted Beta Page</h1>
        <p>You are not a beta user.</p>
        <HomePageLink />
      </div>
    </main>
  )
}
