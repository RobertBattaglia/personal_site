import Typography from "typography"
import githubTheme from "typography-theme-github"

githubTheme.overrideThemeStyles = () => ({
  "h1,h2,h3": {
    border: "none",
  },
  h1: {
    fontSize: "4rem",
  },
  p: {
    fontSize: "1rem",
  },
  a: {
    fontSize: "1rem",
  },
})

const typography = new Typography(githubTheme)

export const { scale, rhythm, options } = typography
export default typography
