import { FC } from 'react'
import {useBooleanFlagValue, useNumberFlagValue, useStringFlagValue} from '@openfeature/react-sdk'

type WelcomeMessageType = {}

const WelcomeMessage: FC<WelcomeMessageType> = ({}) => {
  const font_size = useNumberFlagValue('font_size', 12)
  return (
    <div className='border border-1 rounded border-secondary p-2'>
      <code>font_size: {font_size}</code>
    </div>
  )
}

export default WelcomeMessage
