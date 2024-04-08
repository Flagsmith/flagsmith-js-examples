import { FC } from 'react'
import {
  useBooleanFlagValue,
  useNumberFlagValue,
  useStringFlagValue,
} from '@openfeature/react-sdk'
import { useFlags } from 'flagsmith/react'

type WelcomeMessageType = {}

const WelcomeMessage: FC<WelcomeMessageType> = ({}) => {
  const { font_size } = useFlags(['font_size'])
  return (
    <div className='border border-1 rounded border-secondary p-2'>
      <code>font_size: {font_size.value}</code>
    </div>
  )
}

export default WelcomeMessage
