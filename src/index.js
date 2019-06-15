import { useState, useEffect } from 'react'

export const PREFERENCES = {
  DARK: 'dark',
  LIGHT: 'light',
  NONE: 'no-preference',
}

export const values = [PREFERENCES.DARK, PREFERENCES.LIGHT, PREFERENCES.NONE]

export const makeQuery = pref => `(prefers-color-scheme: ${pref})`

export const matchPreference = pref => window.matchMedia(makeQuery(pref))

export const getPreference = preferences =>
  preferences
    .map(value => ({
      preference: value,
      matchMedia: matchPreference(value),
    }))
    .filter(pref => pref.matchMedia.matches)[0]

export const attachListener = (pref, setScheme) => {
  let unbind
  const listener = () => {
    const newPref = getPreference(values)
    setScheme(newPref.preference)
    pref.matchMedia.removeListener(listener)
    // recursion
    // NOTE: we need to attach a new listener to ensure it fires on next change
    unbind = attachListener(newPref, setScheme)
  }
  pref.matchMedia.addListener(listener)
  return () => {
    if (unbind) {
      unbind()
    } else {
      pref.matchMedia.removeListener(listener)
    }
  }
}

// NOTE: outside hook to avoid this value recomputing
const initialPreference = getPreference(values)

export const useColorScheme = () => {
  if (!('matchMedia' in window)) {
    // can not detect
    return { scheme: PREFERENCES.NONE }
  }
  const [scheme, setScheme] = useState(
    initialPreference ? initialPreference.preference : PREFERENCES.NONE
  )

  useEffect(() => {
    if (!initialPreference) return
    return attachListener(initialPreference, setScheme)
  }, [])

  return { scheme }
}
