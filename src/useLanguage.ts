import { UseLanguage } from "./types"
import { isFunction } from "lodash"
import { useValue } from "@bytesoftio/use-value"
import { useMemo } from "react"

export const useLanguage: UseLanguage = (initializer) => {
  const translator = useMemo(() => isFunction(initializer) ? initializer() : initializer, [])

  useValue(translator.language)

  const language = translator.getLanguage()
  const setLanguage = (language: string) => translator.setLanguage(language)

  return [language, setLanguage]
}