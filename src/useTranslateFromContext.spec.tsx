import { mount } from "enzyme"
import React from "react"
import { createTranslator } from "@bytesoftio/translator"
import { TranslatorContext, useTranslateFromContext } from "."
import { act } from "react-dom/test-utils"

describe("useTranslateFromContext", () => {
  it("uses translates from context", () => {
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
      const t = useTranslateFromContext()

      return (
        <h1>{ t("foo") }</h1>
      )
    }


    const wrapper = mount(<Root/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("bar")
    expect(renders).toBe(1)

    act(() => translator.setLanguage("de"))

    expect(target().text()).toBe("yolo")
    expect(renders).toBe(2)
  })
})
