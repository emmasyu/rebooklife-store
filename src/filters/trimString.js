export default function trim(str, size) {
  if (str?.length > size) {
    // eslint-disable-next-line no-param-reassign
    str = `${str.slice(0, size - 2)}...`;
  }
  return str;
}
