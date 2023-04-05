function convertTimeToLocale(time) {
  const localDate = new Date(time * 1000).toLocaleDateString();
  return localDate;
}
function convertTimeToValue(time) {
  const valueDate = new Date(time) / 1000;
  return valueDate;
}
function convertTimeToISO(time) {
  const ISODate = new Date(time * 1000).toISOString().split("T")[0];
  return ISODate;
}

export { convertTimeToLocale, convertTimeToValue, convertTimeToISO };
