import { TypographyOptions } from '@material-ui/core/styles/createTypography'
import palette from './palette'

const headerFontFamily = 'Roboto Slab'
const typography: TypographyOptions = {
  fontFamily: 'Lato',
  h1: {
    fontFamily: headerFontFamily,
    fontSize: 60,
    color: palette.text.primary,
    fontWeight: 800,
  },
  h2: {
    fontFamily: headerFontFamily,
    fontSize: 50,
    color: palette.text.primary,
    fontWeight: 800,
  },
  h3: {
    fontFamily: headerFontFamily,
    fontSize: 45,
    color: palette.text.primary,
    fontWeight: 700,
  },
  h4: {
    fontFamily: headerFontFamily,
    fontSize: 40,
    color: palette.text.primary,
    fontWeight: 700,
  },
  h5: {
    fontFamily: headerFontFamily,
    fontSize: 35,
    color: palette.text.primary,
    fontWeight: 600,
  },
  h6: {
    fontFamily: headerFontFamily,
    fontSize: 30,
    color: palette.text.primary,
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: 25,
    color: palette.text.primary,
    fontWeight: 700,
  },
  subtitle2: {
    fontSize: 20,
    color: palette.text.primary,
    fontWeight: 700,
  },
  body1: {
    fontSize: 16,
    color: palette.text.primary,
    fontWeight: 400,
  },
  body2: {
    fontSize: 14,
    color: palette.text.primary,
    fontWeight: 400,
  },
  button: {
    fontSize: 14,
    fontWeight: 700,
    color: palette.text.primary,
    textTransform: 'none',
  },
  overline: {
    fontSize: 14,
    fontWeight: 700,
    color: palette.text.primary,
    textTransform: 'none',
  },
  caption: {
    fontFamily: headerFontFamily,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: palette.text.primary,
  },
}

export default typography
