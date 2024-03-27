'use client'
import { FC, ReactNode, useRef } from 'react'
import { IState } from 'flagsmith/types'
import { FlagsmithProvider } from '@openfeature/flagsmith'
import { createFlagsmithInstance } from 'flagsmith/isomorphic'
import { OpenFeature } from '@openfeature/web-sdk'
import { OpenFeatureProvider } from '@openfeature/react-sdk'

type FeatureFlagProviderType = {
  serverState: IState
  children: ReactNode
}

const FeatureFlagProvider: FC<FeatureFlagProviderType> = ({
  serverState,
  children,
}) => {
  const renderRef = useRef(true)
  const flagsmithInstance = useRef(createFlagsmithInstance())
  if (renderRef.current) {
    flagsmithInstance.current.setState(serverState)
    OpenFeature.setProvider(
      new FlagsmithProvider({
        flagsmithInstance: flagsmithInstance.current,
        environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
      }),
    )
    renderRef.current = false;
  }

  return (
    <OpenFeatureProvider>
      <>{children}</>
    </OpenFeatureProvider>
  )
}

export default FeatureFlagProvider
