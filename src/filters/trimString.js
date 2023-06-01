export function trim(str, size) {
  if (str?.length > size) {
    str = str.slice(0, size - 2) + "...";
  }
  return str;
}
