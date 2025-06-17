import { darken } from "@mui/material";
import { argbToHex, mdcolors } from "../utils/colors";

export const textFieldStyle = {
  '& label': { color: argbToHex(mdcolors.outline) },
  '& label.Mui-focused': { color: darken(argbToHex(mdcolors.primary), 0.2) },
  '& .MuiOutlinedInput-root': {
    color: argbToHex(mdcolors.secondary),
    '& fieldset': {
      borderColor: argbToHex(mdcolors.outlineVariant),
      borderRadius: '1rem',
    },
    '&:hover fieldset': {
      borderColor: argbToHex(mdcolors.secondary),
    },
    '&.Mui-focused fieldset': {
      borderColor: darken(argbToHex(mdcolors.primary), 0.2),
    },
  }
}