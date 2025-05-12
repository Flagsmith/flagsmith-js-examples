import { HomePageLink } from './components/HomePageLink'

/**
 * This page is a server component that displays a message to non-logged in users.
 * Since there's no need for client-side interactivity, we can simply return
 * the HTML.
 *
 * @returns {React.ReactNode}
 */
export const UnauthorizedPage = () => {
  return (
    <main className={'main'}>
      <div>
        <h1>Restricted Beta Page</h1>
        <p>Must be logged in to access this page.</p>
        <HomePageLink />
      </div>
    </main>
  )
}
