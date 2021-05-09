type ColorScheme = 'light' | 'dark' | 'none'

interface SchemeReturn {
  scheme: ColorScheme
}

export const useColorScheme = () => SchemeReturn
export const getPreference = (preferences: Array<ColorScheme>) => ColorScheme
