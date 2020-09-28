# @bytesoftio/use-translator

## Installation

`yarn add @bytesoftio/use-translator` or `npm install @bytesoftio/use-translator`

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [useTranslator](#usetranslator)
- [useTranslate](#usetranslate)
- [useLanguage](#uselanguage)
- [TranslatorContext](#translatorcontext)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Description

React integration for the [@bytesoftio/translator](https://github.com/bytesoftio/translator) package.

## useTranslator

Subscribe to any updates on a external translatorinstance.

```tsx
import React from "react"
import { createTranslator } from "@bytesoftio/translator"
import { useTranslate, useTranslator } from "@bytesoftio/use-translator"

const translatorInstance = createTranslator({ en: { title: "Foo", nested: { title: "Bar" } } }, "en")

const Component = () => {
  // connect to all translation related changes
  const translator = useTranslator(translatorInstance)

  const t = useTranslate(translator)
  // create a scoped translate function, all translation keys will be prefixed with "nested"
  const tt = useTranslate(translator, "nested")

  return (
    <div>
      <h1>Title: {t("title")}</h1>
      <h2>Nested title: {tt("title")}, same as: {t("nested.title")}</h2>
    </div>
  )
}
```

## useTranslate

Use translations inside your React components.

```tsx
import React from "react"
import { createTranslator } from "@bytesoftio/translator"
import { useTranslate } from "@bytesoftio/use-translator"

const translator = createTranslator({ en: { title: "Foo", nested: { title: "Bar" } } }, "en")

const Component = () => {
  // connect component to language and translation changes
  const t = useTranslate(translator)
  // create a scoped translate function, all translation keys will be prefixed with "nested"
  const tt = useTranslate(translator, "nested")

  return (
    <div>
      <h1>Title: {t("title")}</h1>
      <h2>Nested title: {tt("title")}, same as: {t("nested.title")}</h2>
    </div>
  )
}
```

## useLanguage

Use language related information inside your React component.

```tsx
import React from "react"
import { createTranslator } from "@bytesoftio/translator"
import { useLanguage } from "@bytesoftio/use-translator"

const translator = createTranslator({ en: { title: "Foo", nested: { title: "Bar" } } }, "en")

const Component = () => {
  // connect component to language and translation changes
  const l = useLanguage(translator)
  
  return (
    <div>
      <div>Current: {l.current}</div>
      <div>Fallback: {l.fallback}</div>
      <div>Available: {JSON.stringify(l.available)}</div>
      <button onClick={()=> l.set("de")}>Set language to "de"</button>
    </div>
  )
}
```

## TranslatorContext

You can share the translator instance through a predefined `TranslatorContext`.

```tsx
import React ,{useContext}from "react"
import { createTranslator } from "@bytesoftio/translator"
import { 
  TranslatorContext,
  useTranslator, 
  useTranslate, 
  useLanguage,
} from "@bytesoftio/use-translator" 

const translator = createTranslator({ en: { title: "Foo" }, de: { title: "Bar" } }, "en")

const RootComponent = () => {
  return (
    <TranslatorContext.Provider value={translator}>
      <ChildComponent/>
    </TranslatorContext.Provider>
  )
}

const ChildComponent = () => {
  const translator1 = useContext(TranslatorContext)
  // or use insance in context
  const translator2 = useTranslator()
  
  const t1 = useTranslate(translator)
  // or use insance in context
  const t2 = useTranslate()

  const l1 = useLanguage(translator)
  // or use instance in context
  const l2 = useLanguage()

  const changeLanguage = () => translator1.setLanguage("de")

  return (
    <div>
      <h1>Title: {t2("title")}</h1>
      <button onClick={changeLanguage}>Change language</button>
    </div>
  )
}
```
