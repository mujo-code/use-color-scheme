export const listeners = []

export const createMatchMedia = ({ media: initialMedia }) => {
  let matchable = initialMedia
  const matchMedia = media => ({
    matches: media === matchable,
    addListener: fn => {
      listeners.push(fn)
    },
    removeListener: fn => {
      const index = listeners.indexOf(fn)
      listeners[index] = null
    },
  })
  matchMedia.changeMedia = newMedia => {
    matchable = newMedia
    listeners.forEach(fn => {
      if (typeof fn === 'function') {
        // this is the interface, but the media should match
        fn(matchMedia())
      }
    })
  }
  matchMedia.listeners = listeners
  return matchMedia
}
