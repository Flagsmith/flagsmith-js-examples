'use server'

import { cookies } from 'next/headers'
import { LoginRequest } from '@/app/types'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body: LoginRequest = await request.json()
  //Mock a user id by formatting the email address
  const id = body.email.split('@').join('_').replace(/\./, '_')
  // Create a mock user object and store it in cookie
  const userJSON = {
    id,
    email: body.email,
  }
  const user = JSON.stringify(userJSON)
  cookies().set('user', user)
  return NextResponse.json(userJSON)
}
