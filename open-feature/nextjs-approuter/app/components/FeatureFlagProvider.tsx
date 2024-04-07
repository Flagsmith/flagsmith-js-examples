'use client'
import { FC, ReactNode, useRef } from 'react'
import { IState } from 'flagsmith/types'
import { FlagsmithClientProvider } from '@openfeature/flagsmith-client-provider'
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
    OpenFeature.setProvider(
      new FlagsmithClientProvider({
        flagsmithInstance: flagsmithInstance.current,
        environmentID: 'QjgYur4LQTwe5HpvbvhpzK',
        state:serverState
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
