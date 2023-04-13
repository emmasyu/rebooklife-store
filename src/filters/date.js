function convertTimeToLocale(time) {
  return new Date(time * 1000).toLocaleString();
}
function convertTimeToLocaleDate(time) {
  return new Date(time * 1000).toLocaleDateString();
}
function convertTimeToValue(time) {
  return new Date(time) / 1000;
}
function convertTimeToISO(time) {
  return new Date(time * 1000).toISOString().split("T")[0];
}

export {
  convertTimeToLocale,
  convertTimeToLocaleDate,
  convertTimeToValue,
  convertTimeToISO,
};
