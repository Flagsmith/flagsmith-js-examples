import { User } from '@/app/types'

export function getTraits(user: User | undefined) {
  if (!user) {
    return undefined
  }
  return { email: user.email }
}
