'use client'

import { FC, ReactNode, useRef } from 'react'

import { FlagsmithProvider } from 'flagsmith/react'
import { IState } from 'flagsmith/types'
import { createFlagsmithInstance } from 'flagsmith/isomorphic'

type FeatureFlagProviderType = {
  serverState: IState
  children: ReactNode
}

const FeatureFlagProvider: FC<FeatureFlagProviderType> = ({
  serverState,
  children,
}) => {
  const flagsmithInstance = useRef(createFlagsmithInstance())
  return (
    <FlagsmithProvider
      flagsmith={flagsmithInstance.current}
      serverState={serverState}
    >
      <>{children}</>
    </FlagsmithProvider>
  )
}

export default FeatureFlagProvider
