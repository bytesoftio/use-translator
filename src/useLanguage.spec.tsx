import { useLanguage } from "./index"
import React from "react"
import { mount } from "enzyme"
import { createTranslator } from "@bytesoftio/translator"
import { act } from "react-dom/test-utils"

describe("useLanguage", () => {
  it("uses language", async () => {
    const translator = createTranslator({}, "en")

    let renders = 0
    let receivedSetLanguage

    const Test = () => {
      renders++
      const [language, setLanguage] = useLanguage(translator)
      receivedSetLanguage = setLanguage

      return (
        <h1>{language}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("en")
    expect(translator.getLanguage()).toBe("en")
    expect(renders).toBe(1)

    act(() => receivedSetLanguage("de"))

    expect(target().text()).toBe("de")
    expect(translator.getLanguage()).toBe("de")
    expect(renders).toBe(2)

    act(() => translator.setLanguage("en"))

    expect(target().text()).toBe("en")
    expect(translator.getLanguage()).toBe("en")
    expect(renders).toBe(3)

    act(() => translator.setLanguage("en"))

    expect(renders).toBe(3)
  })
})