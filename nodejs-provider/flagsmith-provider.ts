import {
    EvaluationContext,
    FlagValue,
    Hook,
    JsonValue,
    Logger,
    OpenFeatureEventEmitter,
    Provider,
    ProviderStatus,
    ResolutionDetails,
} from '@openfeature/js-sdk';
import Flagsmith from 'flagsmith-nodejs';
import { Flags, FlagsmithConfig } from 'flagsmith-nodejs/build/sdk';

const typeFactory = (value: any, type: 'string' | 'number' | 'object'): any => {
    if (value === undefined) return undefined;
    if (type === 'number' && !isNaN(value)) return value;
    if (type === 'string' && typeof value === 'string') {
        try {
            return typeof JSON.parse(value) !== 'object' ? value : undefined;
        } catch {
            return value;
        }
    }
    if (type === 'object') {
        try {
            const obj = JSON.parse(value);
            return typeof obj === 'object' ? obj : undefined;
        } catch {
            return undefined;
        }
    }
    return undefined;
};

export default class FlagsmithProvider implements Provider {
    readonly metadata = {
        name: 'Flagsmith Provider',
    } as const;

    hooks?: Hook<FlagValue>[];
    flagsmith: Flagsmith;
    environmentFlags: Promise<Flags>;

    constructor(config: FlagsmithConfig) {
        this.flagsmith = new Flagsmith(config);
        this.environmentFlags = this.flagsmith.getEnvironmentFlags();
    }

    async resolveBooleanEvaluation(
        flagKey: string,
        defaultValue: boolean,
        context: EvaluationContext,
        logger: Logger
    ): Promise<ResolutionDetails<boolean>> {
        try {
            const flags = await this.environmentFlags;
            const value = flags.isFeatureEnabled(flagKey) ?? defaultValue;
            return {
                value,
                reason: 'some reason for resolveBooleanEvaluation',
            };
        } catch (err) {
            throw err;
        }
    }

    async resolveStringEvaluation(
        flagKey: string,
        defaultValue: string,
        context: EvaluationContext,
        logger: Logger
    ): Promise<ResolutionDetails<string>> {
        try {
            const flags = await this.environmentFlags;
            const value = typeFactory(flags.getFeatureValue(flagKey), 'string') ?? defaultValue;
            return {
                value,
                reason: 'some reason for resolveStringEvaluation',
            };
        } catch (err) {
            throw err;
        }
    }

    async resolveNumberEvaluation(
        flagKey: string,
        defaultValue: number,
        context: EvaluationContext,
        logger: Logger
    ): Promise<ResolutionDetails<number>> {
        try {
            const flags = await this.environmentFlags;
            const value = typeFactory(flags.getFeatureValue(flagKey), 'number') ?? defaultValue;
            return {
                value,
                reason: 'some reason for resolveNumberEvaluation',
            };
        } catch (err) {
            throw err;
        }
    }

    async resolveObjectEvaluation<T extends JsonValue>(
        flagKey: string,
        defaultValue: T,
        context: EvaluationContext,
        logger: Logger
    ): Promise<ResolutionDetails<T>> {
        try {
            const flags = await this.environmentFlags;
            const value = typeFactory(flags.getFeatureValue(flagKey), 'object') ?? defaultValue;
            return {
                value,
                reason: 'some reason for resolveObjectEvaluation',
            };
        } catch (err) {
            throw err;
        }
    }

    status?: ProviderStatus;
    events?: OpenFeatureEventEmitter;

    async initialize(context?: EvaluationContext): Promise<void> {
        // Initialization logic here if needed
    }

    async onClose(): Promise<void> {
        await this.flagsmith.close();
    }
}
