export const numberWithCommas = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const kFormatter = (num: number) =>
  Math.abs(num) > 999 ? (Math.abs(num) / 1000).toFixed(1) + 'k' : num;
