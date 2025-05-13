'use client'

import React, { ChangeEvent, FC, FormEvent, useState } from 'react'

import { User } from '@/app/types'
import { useRouter } from 'next/navigation'
import { useUser } from '@/app/hooks/useUser'

const LoginForm: FC<{ defaultUser: User | undefined }> = ({ defaultUser }) => {
  // Router is used to refresh the page after a login or logout.
  const router = useRouter()

  const { login, logout, user } = useUser(defaultUser)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Disable the login button if the form is not filled out.
  const disableLogin = !formData.email || !formData.password

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!disableLogin) {
      login(formData).then(() => {
        router.refresh()
      })
    }
  }

  const handleLogout = () => {
    logout().then(() => {
      router.refresh()
    })
  }

  return (
    <div className='d-flex p-4 flex-row justify-content-end'>
      {user ? (
        <button onClick={handleLogout} className='btn btn-link'>
          Logout
        </button>
      ) : (
        <form className='d-flex flex-row gap-4' onSubmit={handleLogin}>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            placeholder='Username'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder='Password'
            type='password'
            className='form-control'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            disabled={disableLogin}
            type='submit'
            className='btn btn-primary'
          >
            Login
          </button>
        </form>
      )}
    </div>
  )
}

export default LoginForm
