import { cookies } from 'next/headers'
import { User } from '@/app/types'

const useDefaultUser = () => {
  const user = cookies().get('user')?.value

  try {
    return user ? (JSON.parse(user) as User) : undefined
  } catch (e) {
    return undefined
  }
}

export default useDefaultUser