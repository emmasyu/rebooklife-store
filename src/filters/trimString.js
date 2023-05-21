export function trim(str, size) {
  if (str?.length > size) {
    str = str.slice(0, size - 3) + "...";
  }
  return str;
}
