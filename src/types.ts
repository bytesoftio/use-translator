import { HookValue, ValueInitializer } from "@bytesoftio/use-value"

export interface HookTranslator {
  language: HookValue<string>
  fallbackLanguage: HookValue<string|undefined>
  translations: HookValue<Translations>

  getLanguage(): string
  setLanguage(language: string): void
  getLanguages(): string[]
  getFallbackLanguage(): string|undefined
  setFallbackLanguage(language: string): void
  getTranslations(): Translations
  addTranslations(translations: Translations): void
  addTranslationsForLanguage(language: string, translations: object): void

  get(key: string, replacements?: any[], language?: string): string
  has(key: string, language?: string): boolean

  listen(callback: TranslatorCallback)
  use(scope?: string): TranslateFunction
  useLanguage(): LanguageSpread
}

export type Translations = { [K: string]: object }
export type TranslateFunction = (key: string, replacements?: any[], language?: string) => string
export type TranslatorSpread = [TranslateFunction, string, LanguageUpdater]
export type LanguageUpdater = (language: string) => void
export type LanguageSpread = [string, LanguageUpdater]
export type TranslatorCallback = (translator: HookTranslator) => void
export type CreateTranslator = (translations: Translations, language: string, fallbackLanguage?: string) => HookTranslator
export type UseTranslator = (initializer: ValueInitializer<HookTranslator>, scope?: string) => TranslateFunction
export type UseLanguage = (initializer: ValueInitializer<HookTranslator>) => LanguageSpread
