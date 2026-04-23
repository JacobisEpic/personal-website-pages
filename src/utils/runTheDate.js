export const getRunTheDateMiles = (date = new Date()) => {
  const month = date.getMonth() + 1;
  const day = String(date.getDate()).padStart(2, "0");

  return `${month}.${day}`;
};
