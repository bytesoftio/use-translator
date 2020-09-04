import { ObservableTranslator } from "@bytesoftio/translator"

export type TranslateFunction = (key: string, replacements?: any[], language?: string) => string
export type LanguageUpdater = (language: string) => void
export type LanguageSpread = [string, LanguageUpdater]

export type UseTranslator = (translator: ObservableTranslator) => ObservableTranslator
export type UseTranslatorFromContext = (scope?: string) => ObservableTranslator

export type UseTranslate = (initializer: ObservableTranslator, scope?: string) => TranslateFunction
export type UseTranslateFromContext = (scope?: string) => TranslateFunction
