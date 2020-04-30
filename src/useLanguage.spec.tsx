import { createTranslator, useLanguage } from "./index"
import React from "react"
import { mount } from "enzyme"

describe("useLanguage", () => {
  it("uses language", () => {
    const translator = createTranslator({}, "en")
    translator.useLanguage = jest.fn(() => ["foo"] as any)

    const Test = () => {
      const [language] = useLanguage(translator)

      return (
        <h1>{language}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("foo")
    expect(translator.useLanguage).toHaveBeenCalledTimes(1)
  })
})