import Typography from "typography"
// import Wordpress2016 from "typography-theme-wordpress-2016"
import funstonTheme from "typography-theme-funston"

console.log(funstonTheme)
const googleFonts = [
  {
    name: "Black Han Sans",
    styles: ["400"],
  },
]
funstonTheme.googleFonts = [...googleFonts, ...funstonTheme.googleFonts]
funstonTheme.headerFontFamily = [
  "Black Han Sans",
  ...funstonTheme.headerFontFamily,
]
funstonTheme.bodyFontFamily = ["Jeju Gothic", ...funstonTheme.bodyFontFamily]

const typography = new Typography(funstonTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
