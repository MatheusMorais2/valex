import dayjs from "dayjs";

export function buildCardName(employeeName: string) {
  const nameArr = employeeName.split(" ");
  let nameCard = "";

  if (nameArr.length === 1) {
    nameCard = nameArr[0].toUpperCase();
  } else if (nameArr.length === 2) {
    nameCard = `${nameArr[0]} ${nameArr[nameArr.length - 1]}`.toUpperCase();
  } else if (nameArr.length >= 3) {
    let middleName = "";
    for (let i = 1; i < nameArr.length - 1; i++) {
      if (nameArr[i].length > 2) {
        middleName = nameArr[i];
        break;
      }
    }
    nameCard = `${nameArr[0]} ${middleName[0]} ${
      nameArr[nameArr.length - 1]
    }`.toUpperCase();
  }
  return nameCard;
}

export function buildExpirationDate() {
  const date = dayjs().add(5, "year").format("MM/YY");
  return date;
}

export function buildCardNumber() {
  const secondDigit = Math.floor(Math.random() * 5) + 1;
  const otherDigits = Math.floor(Math.random() * 100000000000000);
  return `5${secondDigit}${otherDigits}`;
}

export function validateCardType(cardType: string) {
  if (
    cardType !== "groceries" &&
    cardType !== "restaurant" &&
    cardType !== "transport" &&
    cardType !== "education" &&
    cardType !== "health"
  ) {
    return false;
  } else return true;
}
