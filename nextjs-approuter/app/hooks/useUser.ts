import { useCallback, useState } from 'react'
import { User } from '@/app/types'
import { useFlagsmith } from 'flagsmith/react'
import getTraits from '@/app/utils/getTraits'

export interface LoginRequest {
  email: string
  password: string
}
export default function (defaultUser: User | null = null) {
  const [user, setUser] = useState(defaultUser)
  const flagsmith = useFlagsmith()
  const login = useCallback((data: LoginRequest) => {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res: User | null) => {
        if (res) {
          flagsmith.identify(res.id, getTraits(res))
          setUser(res)
        }
      })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    flagsmith.logout()
    return fetch('/api/logout', {
      method: 'POST',
      body: '{}',
    })
  }, [])

  return { login, logout, user }
}
