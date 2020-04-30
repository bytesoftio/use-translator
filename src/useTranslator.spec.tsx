import { createTranslator, useTranslator } from "./index"
import { mount } from "enzyme"
import React from "react"

describe("useTranslator", () => {
  it("uses translations", () => {
    const translator = createTranslator({}, "en")
    translator.use = jest.fn(() => () => "foo")

    const Test = () => {
      const t = useTranslator(translator)

      return (
        <h1>{t("key")}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("foo")
    expect(translator.use).toHaveBeenCalledTimes(1)
  })

  it("uses translations with scope", () => {
    const translator = createTranslator({}, "en")
    translator.use = jest.fn(() => () => "foo")

    const Test = () => {
      const t = useTranslator(translator, "bar")

      return (
        <h1>{t("key")}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("foo")
    expect(translator.use).toHaveBeenCalledTimes(1)
    expect(translator.use).toHaveBeenCalledWith("bar")
  })
})