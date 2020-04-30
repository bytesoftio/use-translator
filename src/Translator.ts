import { createValue, HookValue, useValue } from "@bytesoftio/use-value"
import {
  HookTranslator,
  LanguageSpread,
  TranslateFunction,
  Translations,
  TranslatorCallback,
  TranslatorSpread,
} from "./types"
import { translate } from "./translate"
import { compact, startsWith, keys, merge } from "lodash"

export class Translator implements HookTranslator {
  language: HookValue<string>
  fallbackLanguage: HookValue<string|undefined>
  translations: HookValue<Translations>

  constructor(translations: Translations, language: string, fallbackLanguage?: string) {
    this.language = createValue(language)
    this.translations = createValue(translations)
    this.fallbackLanguage = createValue(fallbackLanguage)
  }

  getLanguage(): string {
    return this.language.get()
  }

  setLanguage(language: string): void {
    this.language.set(language)
  }

  getLanguages(): string[] {
    return keys(this.getTranslations())
  }

  getTranslations(): Translations {
    return this.translations.get()
  }

  addTranslations(translations: Translations): void {
    this.translations.set(merge(this.translations.get(), translations))
  }

  addTranslationsForLanguage(language: string, translations: object): void {
    this.addTranslations({[language]: translations})
  }

  getFallbackLanguage(): string|undefined {
    return this.fallbackLanguage.get()
  }

  setFallbackLanguage(language: string): void {
    this.fallbackLanguage.set(language)
  }

  get(key: string, replacements?: any[], language: string = this.getLanguage()): string {
    return translate(this.translations.get(), language, key, replacements, this.fallbackLanguage.get())
  }

  has(key: string, language: string = this.getLanguage()): boolean {
    const translation =  this.get(key, [], language)

    return translation !== `{ ${language}.${key} }`
  }

  listen(callback: TranslatorCallback) {
    this.translations.listen(() => callback(this))
    this.language.listen(() => callback(this))
    this.fallbackLanguage.listen(() => callback(this))
  }

  use(scope?: string): TranslateFunction {
    const [translate] = this.unpack(scope)

    useValue(this.translations)
    useValue(this.language)
    useValue(this.fallbackLanguage)

    return translate
  }

  useLanguage(): LanguageSpread {
    useValue(this.language)

    const [translate, language, setLanguage] = this.unpack()

    return [language, setLanguage]
  }

  protected unpack(scope?: string): TranslatorSpread {
    const translate: TranslateFunction = (key: string, replacements?: any[], language?: string) => {
      const path = startsWith(key, "~") ? key.replace("~", "") : compact([scope, key]).join(".")

      return this.get(path, replacements, language)
    }

    return [
      translate,
      this.getLanguage(),
      (language: string) => this.setLanguage(language),
    ]
  }
}