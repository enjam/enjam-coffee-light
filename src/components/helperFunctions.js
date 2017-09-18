
const toRgbaText = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`;

const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

const sanitizeVal = val => clamp(Math.round(val), 0, 255);

const sanitizeColor = c => {
  c[0] = sanitizeVal(c[0]);
  c[1] = sanitizeVal(c[1]);
  c[2] = sanitizeVal(c[2]);
}

export {
  toRgbaText,
  clamp,
  sanitizeVal,
  sanitizeColor,
};
