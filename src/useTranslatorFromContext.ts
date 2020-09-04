import { useContext } from "react"
import { TranslatorContext, useTranslator } from "./index"
import { UseTranslatorFromContext } from "./types"

export const useTranslatorFromContext: UseTranslatorFromContext = () => {
  const translator = useContext(TranslatorContext)

  if ( ! translator) {
    throw new Error("You must initialize TranslatorContext before using it")
  }

  return useTranslator(translator)
}
