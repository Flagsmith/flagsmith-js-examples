import { FC } from 'react'
import { useFlags } from 'flagsmith/react'

type WelcomeMessageType = {}

const WelcomeMessage: FC<WelcomeMessageType> = ({}) => {
  const { welcome_message } = useFlags(['welcome_message'])
  if (!welcome_message.enabled) {
    return null
  }
  return (
    <div className='border border-1 rounded border-secondary p-2'>
      <code>{welcome_message.value}</code>
    </div>
  )
}

export default WelcomeMessage
