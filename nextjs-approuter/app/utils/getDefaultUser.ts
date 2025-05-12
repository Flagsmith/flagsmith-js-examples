import { User } from '@/app/types'
import { cookies } from 'next/headers'

export const getDefaultUser = async () => {
  const user = (await cookies()).get('user')?.value

  try {
    return user ? (JSON.parse(user) as User) : undefined
  } catch (e) {
    return undefined
  }
}
