import { Translator } from "./index"
import React from "react"
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"

describe("Translator", () => {
  it("accepts language and translations", () => {
    const translator = new Translator({ en: { foo: "bar" } }, "en")

    expect(translator.language.get()).toBe("en")
    expect(translator.translations.get()).toEqual({ en: { foo: "bar" } })
  })

  it("gets and sets language", () => {
    const translator = new Translator({ en: { foo: "bar" } }, "en")

    expect(translator.getLanguage()).toBe("en")

    translator.setLanguage("de")

    expect(translator.getLanguage()).toBe("de")
  })

  it("translates text", () => {
    const translator = new Translator({ en: { foo: "bar" } }, "en")

    expect(translator.get("foo")).toBe("bar")
  })

  it("translates text with replacements", () => {
    const translator = new Translator({ en: { foo: "bar $1" } }, "en")

    expect(translator.get("foo", ["a"])).toBe("bar a")
  })

  it("translates text with nested key", () => {
    const translator = new Translator({ en: { foo: { bar: "baz" } } }, "en")

    expect(translator.get("foo.bar")).toBe("baz")
  })

  it("translates text to specific language", () => {
    const translator = new Translator({ en: { foo: "bar" }, de: { foo: "baz" } }, "en")

    expect(translator.get("foo", [], "en")).toBe("bar")
    expect(translator.get("foo", [], "de")).toBe("baz")
  })

  it("tells if a translation exists", () => {
    const translator = new Translator({ en: { foo: "bar" }, de: { boo: "baz" } }, "en")

    expect(translator.has("foo")).toBe(true)
    expect(translator.has("boo")).toBe(false)
    expect(translator.has("foo", "de")).toBe(false)
    expect(translator.has("boo", "de")).toBe(true)
  })

  it("returns placeholder if translation is missing", () => {
    const translator = new Translator({ en: { foo: "bar" } }, "en")

    expect(translator.get("bar.baz")).toBe("{ en.bar.baz }")
  })

  it("uses fallback language", () => {
    const translator = new Translator({ en: { boo: "bar" }, de: { foo: "bar" } }, "en", "de")

    expect(translator.get("foo")).toBe("bar")
  })

  it("gets and set translations", () => {
    const translator = new Translator({ en: { boo: "bar" } }, "en")

    expect(translator.getTranslations()).toEqual({ en: { boo: "bar" } })

    translator.addTranslations({ en: { foo: "bar" } })

    expect(translator.getTranslations()).toEqual({ en: { boo: "bar", foo: "bar" } })

    translator.addTranslationsForLanguage("de", { yolo: "swag" })

    expect(translator.getTranslations()).toEqual({ en: { boo: "bar", foo: "bar" }, de: { yolo: "swag" } })

    translator.addTranslationsForLanguage("de", { foo: "baz" })

    expect(translator.getTranslations()).toEqual({ en: { boo: "bar", foo: "bar" }, de: { yolo: "swag", foo: "baz" } })
  })

  it("gets languages", () => {
    const translator = new Translator({ en: { foo: "bar" }, de: { yolo: "swag" } }, "en")

    expect(translator.getLanguages()).toEqual(["en", "de"])
  })

  it("listens", () => {
    const translator = new Translator({ en: { foo: "bar" } }, "en")
    const callback = jest.fn()

    translator.listen(callback)

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith(translator)

    translator.setLanguage("de")
    expect(callback).toHaveBeenCalledTimes(3)
  })

  it("uses", () => {
    const translator = new Translator({ en: { foo: "bar" }, de: { foo: "baz" } }, "en")

    const Test = () => {
      const t = translator.use()

      return (
        <h1>{t("foo")}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("bar")

    act(() => translator.setLanguage("de"))

    expect(target().text()).toBe("baz")
  })

  it("uses scoped", () => {
    const translator = new Translator({ en: { foo: { bar: "baz" }, yolo: "swag" } }, "en")

    const Test = () => {
      const t = translator.use("foo")

      return (
        <div>
          <h1>{t("bar")} {t("~yolo")}</h1>
        </div>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("baz swag")
  })

  it("uses language", () => {
    const translator = new Translator({}, "en")

    const Test = () => {
      const [language, setLanguage] = translator.useLanguage()

      return (
        <h1 onClick={() => setLanguage("de")}>{language}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("en")

    target().simulate("click")

    expect(target().text()).toBe("de")
  })
})