import { UseLanguage } from "./types"
import { isFunction } from "lodash"
import { useValue } from "@bytesoftio/use-value"

export const useLanguage: UseLanguage = (initializer) => {
  const [translator] = useValue(() => isFunction(initializer) ? initializer() : initializer)

  return translator.useLanguage()
}