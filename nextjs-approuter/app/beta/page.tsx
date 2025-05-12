import Link from 'next/link'
import { getDefaultUser } from '@/app/utils/getDefaultUser'
import { isFeatureEnabledForUser } from '@/app/lib/flagsmith'

const HomePageLink = () => (
  <p className='mt-4'>
    <Link href='/'>Click here to go back to the home page.</Link>
  </p>
)

export default async function RestrictedBeta() {
  const defaultUser = await getDefaultUser()

  if (!defaultUser) {
    return (
      <main className={'main'}>
        <div>
          <p>Must be logged in to access this page.</p>
          <HomePageLink />
        </div>
      </main>
    )
  }

  const isBetaUser = await isFeatureEnabledForUser('beta_users', defaultUser)

  if (!isBetaUser) {
    return (
      <main className={'main'}>
        <div>
          <p>You are not a beta user.</p>
          <HomePageLink />
        </div>
      </main>
    )
  }

  return (
    <main className={'main'}>
      <div>
        <h1>Restricted Beta Page</h1>
        <p>
          This page is restricted to beta users only.
          <br />
          Looks like you have access!
        </p>
        <HomePageLink />
      </div>
    </main>
  )
}
