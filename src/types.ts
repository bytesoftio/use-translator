import { ObservableTranslator } from "@bytesoftio/translator"
import { ValueInitializer } from "@bytesoftio/value"

export type TranslateFunction = (key: string, replacements?: any[], language?: string) => string
export type LanguageUpdater = (language: string) => void
export type LanguageSpread = [string, LanguageUpdater]
export type UseTranslator = (initializer: ValueInitializer<ObservableTranslator>, scope?: string) => TranslateFunction
export type UseLanguage = (initializer: ValueInitializer<ObservableTranslator>) => LanguageSpread
