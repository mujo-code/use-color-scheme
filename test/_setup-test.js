import browserEnv from 'browser-env'
import { createMatchMedia } from './_match-media-shim'
browserEnv(['window'])
window.matchMedia = createMatchMedia({ media: '(prefers-color-scheme: dark)' })
