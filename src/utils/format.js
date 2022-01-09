export const timeToMMDD = (timeStr) => {
  const date = new Date(timeStr);
  const MMDD = `${date.getMonth() + 1}/${date.getDate()}`;
  return MMDD;
};

export const commaStr = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
