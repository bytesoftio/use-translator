# @bytesoftio/use-translator

## Installation

`yarn add @bytesoftio/use-translator` or `npm install @bytesoftio/use-translator`

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [Usage](#usage)
  - [createTranslator](#createtranslator)
  - [HookTranslator](#hooktranslator)
  - [useTranslator](#usetranslator)
  - [useLanguage](#uselanguage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Description

A very simple library to handle translations inside React applications.

## Usage

### createTranslator

Creates a new instance of HookTranslator that can be reused across the application.

```ts
import { createTranslator } from "@bytesoftio/use-translator"

const translations = {
  en: { title: "Foo", about: { company: "Acme" } },
  de: { title: "Bar" }
}
const language = "de"
const fallbackLanguage = "en"

const translator = createTranslator(translations, language, fallbackLanguage)
```

### HookTranslator

The translator instance provides various methods to handle all your translation needs.

```ts
import { createTranslator } from "@bytesoftio/use-translator"

const translator = createTranslator({ en: { title: "Foo", about: "https://$1", nested: { text: "Bar" } }}, "en")

// get current language
translator.getLanguage()

// change current language
translator.setLanguage("de")

// get available languages
translator.getLanguages()

// get all translations
translator.getTranslations()

// add translations for multiple languages at once
translator.addTranslations({ en: { title: "Bar" } })

// add translations for a specific language
translator.addTranslationsForLanguage("en", { subtitle: "Yolo" })

// get fallback language ...
translator.getFallbackLanguage()

// update fallback language
translator.setFallbackLanguage("en")

// get a translated string, returns "Foo"
translator.get("title")

// get an interpolated translated string, returns "https://github.com"
translator.get("about", ["github.com"])

// get translation for a specific language, returns "{ title }"
translator.get("title", undefined, "de")

// get translation with a nestted key, returns "Bar"
translator.get("nested.text")

// check if a translation exists
translator.has("foo")

// check if a translation exists for a specific language
translator.has("foo", "de")

// listen to language, translations or fallbackLanguage changes
translator.listen(translator => console.log(translator.getLanguage()))

// use translator like a hook, when used inside a react component,
// the component will become aware of language and translations changes,
// take a look at the "useTranslator" hook
const translate = translator.use()

// use translate function the same as "translator.translate()" method, returns "https://github.com"
translate("about", ["github.com"], "en")

// create a nested translate function, all translation keys be prefixed with the given scope "nested"
const scopedTranslate = translator.use("nested")

// same as translator.get("nested.text")
scopedTranslate("text")

// use translator like a hook, when called inside a React component,
// the component will become aware of language changes, take a look at the "useLanguage" hook
const [language, setLanguage] = translator.useLanguage()
```

### useTranslator

Use translations inside your React components.

```tsx
import React from "react"
import { createTranslator, useTranslator } from "@bytesoftio/use-translator"

const translator = createTranslator({ en: { title: "Foo", nested: { title: "Bar" } } }, "en")

const Component = () => {
  // connect component to language and translation changes
  const t = useTranslator(translator)
  // create a scoped translate function, all translation keys will be prefixed with "nested"
  const tt = useTranslator(translator, "nested")

  return (
    <div>
      <h1>Title: {t("title")}</h1>
      <h2>Nested title: {tt("title")}, same as: {t("nested.title")}</h2>
    </div>
  )
}
```

### useLanguage

Use and control current language inside your React components.

```tsx
import React from "react"
import { createTranslator, useLanguage, useTranslator } from "@bytesoftio/use-translator"

const translator = createTranslator({ en: { title: "Foo" }, de: { title: "Bar" } }, "en")

const Component = () => {
  // get current language and a way to change it
  const [langauge, setLanguage] = useLanguage(translator)
  // connect translator to component
  const t = useTranslator(translator)

  const changeLanguage = () => setLanguage("de")

  return (
    <div>
      <h1>Title: {t("title")}</h1>
      <button onClick={changeLanguage}>Change language</button>
    </div>
  )
}
```