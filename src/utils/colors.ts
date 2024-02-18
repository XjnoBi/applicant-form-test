export const hexToRgb = (hex: string) => {
// Remove the hash (#) if it exists
  hex = hex.replace(/^#/, '');

  // Parse the hex value into individual RGB components
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [`${r}, ${g}, ${b}`, {r, g, b}];
}