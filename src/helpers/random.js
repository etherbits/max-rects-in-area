export function randomInt(max, min) {
  if (arguments.length < 2) {
    min = 0;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}
