import { useTranslate } from "./useTranslate"
import { UseTranslateFromContext } from "./types"
import { useTranslatorFromContext } from "./useTranslatorFromContext"

export const useTranslateFromContext: UseTranslateFromContext = (scope) => {
  const translator = useTranslatorFromContext()

  return useTranslate(translator, scope)
}
