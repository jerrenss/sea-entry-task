import * as colors from '@material-ui/core/colors'
import { Palette } from '@material-ui/core/styles/createPalette'

const white = '#FFFFFF'
const black = '#000000'

export interface AdditionalPaletteOptions {
  icon: string
  border: {
    main: string
    secondary: string
  }
}

const palette: Partial<Palette> = {
  primary: {
    contrastText: black,
    dark: black,
    main: '#0088CC',
    light: white,
  },
  secondary: {
    contrastText: white,
    dark: black,
    main: '#BB1133',
    light: white,
  },
  success: {
    // Shades of Green
    contrastText: white,
    dark: '#248f24',
    main: '#33cc33',
    light: '#99e699',
  },
  error: {
    // Shades of Red
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[200],
  },
  text: {
    primary: black,
    secondary: black,
    disabled: black,
    hint: black,
    tertiary: '#888888',
    contrast: white,
    light: '#BEBEBE',
    description: black,
    link: '#0000EE',
  },
  icon: colors.grey[400],
  background: {
    default: white,
    paper: white,
    primary: '#f2f3f4',
    secondary: '#FFD700',
    tertiary: white,
    dark: white,
  },
  border: {
    main: black,
    secondary: black,
  },
  divider: '#505050',
}

export default palette
