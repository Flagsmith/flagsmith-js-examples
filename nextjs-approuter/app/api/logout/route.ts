'use server'

import { cookies } from 'next/headers'

export async function POST() {
  // Mock login API
  cookies().delete('user')
  return new Response('{}', {
    status: 200,
  })
}
