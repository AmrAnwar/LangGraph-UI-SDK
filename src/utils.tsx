export function darken(color: string, amount: number) {
  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    let bigint = parseInt(hex.slice(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return { r, g, b };
  };

  // Clamp a value between 0 and 255
  const clamp = (value: number) => Math.max(0, Math.min(255, value));

  // Convert RGB back to HEX
  const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }) => {
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  };

  const { r, g, b } = hexToRgb(color);
  const darkenedRgb = {
    r: clamp(r - amount),
    g: clamp(g - amount),
    b: clamp(b - amount),
  };
  return rgbToHex(darkenedRgb);
}
