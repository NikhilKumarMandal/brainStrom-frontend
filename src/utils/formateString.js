export function formateString(string = "") {
  return string
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const hasMinWords = (value, min) => {
  return value.trim().split(/\s+/).length >= min;
};