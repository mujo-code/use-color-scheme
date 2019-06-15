# Use Color Scheme

This is a React hook that allows you to hook into the browsers detection of color scheme. This will help you detect dark, light or no-preference color schemes.

## Why

Because the user has explicitly asked for a preference why not let them enjoy a dark version of your application. 🌚

![Swap Demo](http://giphygifs.s3.amazonaws.com/media/Y08TdetQESfoSKWEUE/giphy.gif)

[demo page](https://ucs.mujō.com/) => [source code](https://github.com/jcblw/use-color-scheme-demo)

## Technology Used

- [window.matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
- [prefers-color-scheme](https://caniuse.com/#search=prefers-color-scheme)

> Prefers color scheme media query is still very new and not supported on all browsers, please see link for latest support. It will be available in [Chrome (stable) July 30th 2019](https://www.chromestatus.com/features/schedule)

## Install

```shell
npm install use-color-scheme --save
## or
yarn add use-color-scheme
```

## Usage

It is a React hook! So import the hook then place it in the render function of a component.

```jsx
import React from 'react'
import { useColorScheme } from 'use-color-scheme'

const modes = {
  dark: { background: 'black', color: 'white' },
  light: { background: 'white', color: 'black' },
}

export const MyComponent = () => {
  const { scheme } = useColorScheme()
  const style = modes[scheme] || scheme.dark

  return (
    <div style={style}>
      <h1>Your preference is: {scheme}</h1>
    </div>
  )
}
```

[Try it out in CodePen](https://codepen.io/jcblw/pen/JQGmEK)

## Useful Links

[Original Inspiration](https://www.freecodecamp.org/news/how-to-detect-a-users-preferred-color-scheme-in-javascript-ec8ee514f1ef/)
