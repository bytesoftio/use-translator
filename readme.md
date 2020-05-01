# @bytesoftio/use-translator

## Installation

`yarn add @bytesoftio/use-translator` or `npm install @bytesoftio/use-translator`

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [useTranslator](#usetranslator)
- [useLanguage](#uselanguage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Description

React integration for the [@bytesoftio/translator](https://github.com/bytesoftio/translator) package.

## useTranslator

Use translations inside your React components.

```tsx
import React from "react"
import { createTranslator } from "@bytesoftio/translator"
import { useTranslator } from "@bytesoftio/use-translator"

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

## useLanguage

Use and control current language inside your React components.

```tsx
import React from "react"
import { createTranslator } from "@bytesoftio/translator"
import { useLanguage, useTranslator } from "@bytesoftio/use-translator"

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