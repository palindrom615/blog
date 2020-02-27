import Typography from "typography"
import deyoungTheme from "typography-theme-de-young"

const typography = new Typography({
  ...deyoungTheme,
  baseFontSize: '18px',
  googleFonts: [],
  headerFontFamily: ["Black Han Sans"],
  headerWeight: 400,
  bodyFontFamily: ["Jeju Myeongjo"],
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
