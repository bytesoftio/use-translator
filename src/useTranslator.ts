import { UseTranslator } from "./types"
import { isFunction } from "lodash"
import { useValue } from "@bytesoftio/use-value"
import { useMemo } from "react"

export const useTranslator: UseTranslator = (initializer, scope) => {
  const translator = useMemo(() => isFunction(initializer) ? initializer() : initializer, [])

  useValue(translator.translations)
  useValue(translator.language)
  useValue(translator.fallbackLanguage)

  return translator.scope(scope || "")
}