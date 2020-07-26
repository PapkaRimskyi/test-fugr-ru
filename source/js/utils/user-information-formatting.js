function setCapitalLetter(name) {
  if (name.length === 1) {
    return name[0].toUpperCase();
  }
  return name[0].toUpperCase() + name.slice(1);
}

function setPhonePattern(number) {
  return `(${number.slice(0, 3)})${number.slice(3, 6)}-${number.slice(6)}`;
}

export default function userInformationFormatting(userInformation) {
  const userInfo = userInformation;
  userInfo.firstName = setCapitalLetter(userInfo.firstName);
  userInfo.lastName = setCapitalLetter(userInfo.lastName);
  userInfo.phone = setPhonePattern(userInfo.phone);
  return userInfo;
}
