import test from 'ava'
import {
  attachListener,
  matchPreference,
  makeQuery,
  getPreference,
  values,
  PREFERENCES,
} from '../dist'

test('the makeQuery function', t => {
  t.is(makeQuery('foo'), '(prefers-color-scheme: foo)')
  t.is(makeQuery('bar'), '(prefers-color-scheme: bar)')
})

test('the matchPreference method should use match media api', t => {
  window.matchMedia.changeMedia(makeQuery('dark'))
  t.true(matchPreference('dark').matches)
})

test(`the matchPreference method should
  use match media api and eval as false`, t => {
  window.matchMedia.changeMedia(makeQuery('dark'))
  t.false(matchPreference('light').matches)
})

test('the getPreference should return a object with the preference', t => {
  window.matchMedia.changeMedia(makeQuery('dark'))
  t.is(getPreference(values).preference, 'dark')
})

test(`the getPreference should return undefined
  when we are unable to detect the preference`, t => {
  window.matchMedia.changeMedia(makeQuery('dark'))
  t.falsy(getPreference([PREFERENCES.light]))
})

test('the attachListener method should return a function', t => {
  window.matchMedia.changeMedia(makeQuery('dark'))
  const preference = getPreference(values)
  const unbind = attachListener(preference, () => {})
  t.is(typeof unbind, 'function')
  unbind()
})

test('the attachListener should add a listener', t => {
  window.matchMedia.changeMedia(makeQuery('dark'))
  const preference = getPreference(values)
  const unbind = attachListener(preference, () => {})
  const { listeners } = window.matchMedia
  t.is(listeners.filter(x => x).length, 1)
  unbind()
  t.is(listeners.filter(x => x).length, 0)
})

test('the attachListener should attach a new listener on change', t => {
  window.matchMedia.changeMedia(makeQuery('dark'))
  const { listeners } = window.matchMedia
  const preference = getPreference(values)
  const unbind = attachListener(preference, () => {})
  const ogListener = listeners.filter(x => x)[0]
  window.matchMedia.changeMedia(makeQuery('dark'))
  t.not(ogListener, listeners.filter(x => x)[0])
  unbind()
  t.is(listeners.filter(x => x).length, 0)
})

test('the attachListener unbind should unbind all child listeners', t => {
  window.matchMedia.changeMedia(makeQuery('light'))
  const { listeners } = window.matchMedia
  const preference = getPreference(values)
  const unbind = attachListener(preference, () => {})
  window.matchMedia.changeMedia(makeQuery('dark'))
  window.matchMedia.changeMedia(makeQuery('light'))
  window.matchMedia.changeMedia(makeQuery('no-preference'))
  unbind()
  t.is(listeners.filter(x => x).length, 0)
})
