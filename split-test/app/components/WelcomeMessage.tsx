import { FC } from 'react'
import { useFlags, useFlagsmith, useFlagsmithLoading } from 'flagsmith/react'
import useUser from '@/app/hooks/useUser'

type WelcomeMessageType = {}

const WelcomeMessage: FC<WelcomeMessageType> = ({}) => {
  const { hero } = useFlags(['hero'])
  useFlagsmithLoading()
  const flagsmith = useFlagsmith()
  return (
    <div className='border mb-4 border-1 rounded border-secondary p-2'>
      <div className='text-center'>
        <code>{hero.value} hero</code>
      </div>
      {!!flagsmith.identity && (
        <div className='d-flex mt-4 flex-row gap-4'>
          <button
            className='btn btn-primary'
            onClick={() => {
              flagsmith.trackEvent('checkout')
            }}
          >
            Track checkout
          </button>
          <button
            className='btn btn-primary'
            onClick={() => {
              flagsmith.trackEvent('signup')
            }}
          >
            Track signup
          </button>
        </div>
      )}
    </div>
  )
}

export default WelcomeMessage
