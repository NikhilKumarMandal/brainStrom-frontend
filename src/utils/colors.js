import { themeFromSourceColor } from "@material/material-color-utilities";

const theme = themeFromSourceColor(hexToArgb('#6750A4'))
const mdcolors = theme.schemes.dark

function hexToArgb(hex) {
  const cleanHex = hex.replace('#', '')
  return parseInt(`0xFF${cleanHex}`, 16)
}

function argbToHex(argb) {
  const r = (argb >> 16) & 0xFF
  const g = (argb >> 8) & 0xFF
  const b = argb & 0xFF
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()}`
}

export { mdcolors , argbToHex }