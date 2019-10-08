import Typography from "typography"
import githubTheme from "typography-theme-github"

githubTheme.overrideThemeStyles = () => ({
  "h1,h2,h3": {
    border: "none",
  },
  h1: {
    fontSize: "calc(12px + 3vw)",
  },
  h3: {
    fontSize: "calc(12px + 1vw)",
  },
  p: {
    fontSize: "calc(8px + 1vw)",
  },
  a: {
    fontSize: "calc(8px + 1vw)",
  },
})

const typography = new Typography(githubTheme)

export const { scale, rhythm, options } = typography
export default typography
