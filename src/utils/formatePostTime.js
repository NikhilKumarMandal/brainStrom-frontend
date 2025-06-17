export default function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString(); // or use .toLocaleDateString() or .toLocaleTimeString()
}