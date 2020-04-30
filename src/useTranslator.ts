import { UseTranslator } from "./types"
import { isFunction } from "lodash"
import { useValue } from "@bytesoftio/use-value"

export const useTranslator: UseTranslator = (initializer, scope?) => {
  const [translator] = useValue(() => isFunction(initializer) ? initializer() : initializer)

  return translator.use(scope)
}