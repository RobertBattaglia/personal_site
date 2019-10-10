import Typography from "typography"
import grandviewTheme from "typography-theme-grand-view"
import { theme } from "../constants"

grandviewTheme.overrideThemeStyles = () => ({
  "h1,h2,h3": {
    border: "none",
  },
  h1: {
    fontSize: "calc(12px + 2vw)",
  },
  p: {
    fontSize: "calc(8px + 1vw)",
  },
  a: {
    fontSize: "calc(8px + 1vw)",
    color: `${theme.primaryColorFont}`,
  },
})

const typography = new Typography(grandviewTheme)

export const { scale, rhythm, options } = typography
export default typography
