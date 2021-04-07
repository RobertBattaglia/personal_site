import Typography from 'typography'
import grandviewTheme from 'typography-theme-grand-view'
import { theme } from '../constants'

grandviewTheme.overrideThemeStyles = () => ({
  'h1,h2,h3': {
    border: 'none',
  },
  a: {
    color: `${theme.primaryColorFont}`,
  },
})

const typography = new Typography(grandviewTheme)

export const { scale, rhythm, options } = typography
export default typography
