import { useCallback, useState } from 'react'

import { User } from '@/app/types'
import { getTraits } from '@/app/utils/getTraits'
import { useFlagsmith } from 'flagsmith/react'

export interface LoginRequest {
  email: string
  password: string
}

export function useUser(defaultUser: User | null = null) {
  const [user, setUser] = useState(defaultUser)
  const flagsmith = useFlagsmith()

  const login = useCallback(
    (data: LoginRequest) => {
      return fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res: User | { error: string } | null) => {
          console.log('login', { res })
          if (!res) return

          if ('error' in res) {
            throw new Error(res.error)
          }

          flagsmith.identify(res.id, getTraits(res))
          setUser(res)
        })
        .catch((err) => {
          alert(err.message)
        })
    },
    [flagsmith],
  )

  const logout = useCallback(() => {
    return fetch('/api/logout', {
      method: 'POST',
      body: '{}',
    }).then(() => {
      setUser(null)
      flagsmith.logout()
    })
  }, [flagsmith])

  return { login, logout, user }
}
