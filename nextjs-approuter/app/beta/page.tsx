import { BetaPage } from './BetaPage'
import { RestrictedPage } from './RestrictedPage'
import { UnauthorizedPage } from './UnauthorizedPage'
import { checkFeatureFlag } from '@/app/lib/flagsmith'
import { getDefaultUser } from '@/app/utils/getDefaultUser'

/**
 * This page is a server component that checks the user's login status and
 * serves the appropriate page based on their status. Each page can have its
 * own server and client components. Since the React Context API is not available
 * on the server, we need to use the server component to check the user's
 * login status instead of the context provider defined in the layout.tsx file.
 *
 * The general way to determine which way to check feature flags is:
 *
 * - Rendering the page on the server? Use the checkFeatureFlag().
 * - Dynamically changing the UI based on the feature flag? Use the useFlags() hook.
 *
 * @returns {Promise<React.ReactNode>}
 */
export default async function RestrictedBeta() {
  const defaultUser = await getDefaultUser()

  // Unauthorized users are served the UnauthorizedPage because
  // they are not logged in.
  if (!defaultUser) return <UnauthorizedPage />

  // Check if the user is a beta user.
  const { enabled: isBetaUser } = await checkFeatureFlag('beta_users')

  // Regular users are served the RestrictedPage because
  // they are not beta users.
  if (!isBetaUser) return <RestrictedPage />

  // Beta users are served the BetaPage because
  // they are beta users.
  return <BetaPage />
}
