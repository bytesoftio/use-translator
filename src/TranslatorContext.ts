import { createContext } from "react"
import { ObservableTranslator } from "@bytesoftio/translator"

export const TranslatorContext = createContext<ObservableTranslator | null>(null)
