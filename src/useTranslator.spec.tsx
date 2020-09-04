import { createTranslator, ObservableTranslator } from "@bytesoftio/translator"
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"
import React from "react"
import { useTranslator } from "./index"

describe("useTranslator", () => {
  it("uses translator", () => {
    const translator = createTranslator({ en: { foo: "bar" }, de: { foo: "yolo" } }, "en")

    let renders = 0
    let receivedTranslator: ObservableTranslator

    const Test = () => {
      renders++
      receivedTranslator = useTranslator(translator)

      return (
        <h1>{ receivedTranslator.getLanguage() } { receivedTranslator.get("foo") }</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("en bar")
    expect(translator.getLanguage()).toBe("en")
    expect(translator.get("foo")).toBe("bar")
    expect(renders).toBe(1)

    act(() => receivedTranslator.setLanguage("de"))

    expect(target().text()).toBe("de yolo")
    expect(translator.getLanguage()).toBe("de")
    expect(translator.get("foo")).toBe("yolo")
    expect(renders).toBe(2)

    act(() => translator.setLanguage("en"))

    expect(target().text()).toBe("en bar")
    expect(renders).toBe(3)

    act(() => translator.setLanguage("en"))

    expect(renders).toBe(3)
  })
})
