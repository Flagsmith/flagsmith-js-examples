import { User } from '../types'

export default function (user: User | undefined) {
  if (!user) {
    return undefined
  }
  return { email: user.email }
}
