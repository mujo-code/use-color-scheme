export type ColorScheme = 'light' | 'dark' | 'none'

interface SchemeReturn {
  scheme: ColorScheme
}

type UseColorScheme = () => SchemeReturn
type GetPreference = (preferences: Array<ColorScheme>) => ColorScheme

export const useColorScheme: UseColorScheme
export const getPreference: GetPreference
