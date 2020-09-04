import { UseTranslate } from "./types"
import { useValue } from "@bytesoftio/use-value"

export const useTranslate: UseTranslate = (translator, scope) => {
  useValue(translator.translations)
  useValue(translator.language)
  useValue(translator.fallbackLanguage)

  return translator.scope(scope || "")
}
