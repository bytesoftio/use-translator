import { mount } from "enzyme"
import React from "react"
import { createTranslator } from "@bytesoftio/translator"
import { TranslatorContext, useTranslatorFromContext } from "."
import { act } from "react-dom/test-utils"

describe("useTranslatorFromContext", () => {
  it("uses translator from context", () => {
    const translator = createTranslator({ en: { foo: "bar" }, de: { foo: "yolo" } }, "en")
    let renders = 0

    const Root = () => {
      return (
        <TranslatorContext.Provider value={ translator }>
          <Test/>
        </TranslatorContext.Provider>
      )
    }

    const Test = () => {
      renders++
      const translator = useTranslatorFromContext()

      return (
        <h1>{ translator.getLanguage() } { translator.get("foo") }</h1>
      )
    }


    const wrapper = mount(<Root/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("en bar")
    expect(renders).toBe(1)

    act(() => translator.setLanguage("de"))

    expect(target().text()).toBe("de yolo")
    expect(renders).toBe(2)
  })

  it("throws an error if translator context is empty", () => {
    const Test = () => {
      useTranslatorFromContext()

      return null
    }

    expect(() => mount(<Test/>)).toThrow()
  })
})
