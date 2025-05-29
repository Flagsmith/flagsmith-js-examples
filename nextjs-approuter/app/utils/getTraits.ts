import { User } from '@/app/types'

export const getTraits = (user: User | undefined) => {
  if (!user) {
    return undefined
  }

  return { email: user.email }
}
