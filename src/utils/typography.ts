import Typography from "typography"
import deyoungTheme from "typography-theme-de-young"

const typography = new Typography({
  ...deyoungTheme,
  baseFontSize: "21px",
  googleFonts: [],
  headerFontFamily: ["Black Han Sans", "sans-serif"],
  headerWeight: 400,
  bodyFontFamily: ["Jeju Myeongjo", "serif"],
  overrideThemeStyles: () => ({
    "a:hover,a:active": {
      boxShadow: "unset",
    },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
