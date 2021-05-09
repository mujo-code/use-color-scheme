import test from 'ava'
import { renderHook } from '@testing-library/react-hooks'
import { useColorScheme, PREFERENCES, makeQuery } from '../src'
import { createMatchMedia } from './_match-media-shim'

test.before(() => {
  window.matchMedia = createMatchMedia(makeQuery(PREFERENCES.DARK))
})

test('the useColorScheme hook should have the initial value', t => {
  const { result, unmount } = renderHook(() => useColorScheme())
  t.is(result.current.scheme, PREFERENCES.DARK)
  unmount()
  // NOTE: making sure listners are cleaned up
  t.is(window.matchMedia.listeners.filter(x => x).length, 0)
})

test('the useColorScheme hook should update the value on change', t => {
  const { result, unmount } = renderHook(() => useColorScheme())
  t.is(result.current.scheme, PREFERENCES.DARK)
  window.matchMedia.changeMedia(makeQuery(PREFERENCES.LIGHT))
  t.is(result.current.scheme, PREFERENCES.LIGHT)
  unmount()
  // NOTE: making sure listners are cleaned up
  t.is(window.matchMedia.listeners.filter(x => x).length, 0)
})

test(`the useColorScheme should have no preference
  if mediaMatch is not supported`, t => {
  delete window.matchMedia
  const { result } = renderHook(() => useColorScheme())
  t.is(result.current.scheme, PREFERENCES.NONE)
})
