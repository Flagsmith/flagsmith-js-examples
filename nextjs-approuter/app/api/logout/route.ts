'use server'

import { cookies } from 'next/headers'

export async function POST() {
  // Mock login API
  const cookieStore = await cookies()

  cookieStore.delete('user')

  return new Response('{}', {
    status: 200,
  })
}
