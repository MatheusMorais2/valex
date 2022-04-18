import dayjs from "dayjs";

export function compareDates(expiration: string) {
  const todaysDate = dayjs().format("MM/YY");
  const expirationArr = expiration.split("/");
  const todaysDateArr = todaysDate.split("/");

  if (parseInt(todaysDateArr[1]) > parseInt(expirationArr[1])) return false;
  if (
    parseInt(todaysDateArr[1]) === parseInt(expirationArr[1]) &&
    parseInt(todaysDateArr[0]) >= parseInt(expirationArr[0])
  )
    return false;
  return true;
}
