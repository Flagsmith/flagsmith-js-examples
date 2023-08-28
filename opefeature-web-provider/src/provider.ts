import {
  EvaluationContext,
  JsonValue,
  Logger,
  OpenFeatureEventEmitter,
  Provider,
  ProviderMetadata,
  ProviderStatus,
  ResolutionDetails,
} from "@openfeature/web-sdk"
import { createFlagsmithInstance } from "flagsmith"
import { IFlagsmith, IInitConfig } from "flagsmith/types"

const typeFactory = (value: any, type: "string" | "number" | "object"): any => {
  if (value === undefined) return undefined
  if (type === "number" && !isNaN(value)) return value
  if (type === "string" && typeof value === "string") {
    try {
      return typeof JSON.parse(value) !== "object" ? value : undefined
    } catch {
      return value
    }
  }
  if (type === "object") {
    try {
      const obj = JSON.parse(value)
      return typeof obj === "object" ? obj : undefined
    } catch {
      return undefined
    }
  }
  return undefined
}

export default class FlagsmithWebProvider implements Provider {
  readonly metadata: ProviderMetadata = {
    name: "Flagsmith Web Provider",
  }

  private _client: IFlagsmith
  private _status = ProviderStatus.NOT_READY
  private _config: IInitConfig
  events = new OpenFeatureEventEmitter()

  constructor(config: IInitConfig) {
    this._client = createFlagsmithInstance()
    this._config = config
  }

  set status(status: ProviderStatus) {
    this._status = status
  }

  get status() {
    return this._status
  }

  async initialize(context?: EvaluationContext) {
    this.status = ProviderStatus.READY
    return this._client.init({
      ...this._config,
      ...context,
    })
  }

  onContextChange(_: EvaluationContext, newContext: EvaluationContext) {
    return this.initialize(newContext)
  }

  resolveBooleanEvaluation(
    flagKey: string,
    defaultValue: boolean,
    context: EvaluationContext,
    logger: Logger
  ): ResolutionDetails<boolean> {
    try {
      const flags = this._client
      const value = flags.hasFeature(flagKey) ?? defaultValue
      return {
        value,
        reason: "some reason for resolveBooleanEvaluation",
      }
    } catch (err) {
      throw err
    }
  }

  resolveStringEvaluation(
    flagKey: string,
    defaultValue: string,
    context: EvaluationContext,
    logger: Logger
  ): ResolutionDetails<string> {
    try {
      const flags = this._client
      const value =
        typeFactory(flags.getValue(flagKey), "string") ?? defaultValue
      return {
        value,
        reason: "some reason for resolveStringEvaluation",
      }
    } catch (err) {
      throw err
    }
  }

  resolveNumberEvaluation(
    flagKey: string,
    defaultValue: number,
    context: EvaluationContext,
    logger: Logger
  ): ResolutionDetails<number> {
    try {
      const flags = this._client
      const value =
        typeFactory(flags.getValue(flagKey), "number") ?? defaultValue
      return {
        value,
        reason: "some reason for resolveNumberEvaluation",
      }
    } catch (err) {
      throw err
    }
  }

  resolveObjectEvaluation<T extends JsonValue>(
    flagKey: string,
    defaultValue: T,
    context: EvaluationContext,
    logger: Logger
  ): ResolutionDetails<T> {
    try {
      const flags = this._client
      const value =
        typeFactory(flags.getValue(flagKey), "object") ?? defaultValue
      return {
        value,
        reason: "some reason for resolveObjectEvaluation",
      }
    } catch (err) {
      throw err
    }
  }

  async onClose(): Promise<void> {
    this.status = ProviderStatus.NOT_READY
  }
}
