export function removeSpecialCharacters(inputString: string) {
  const regex = /[\s°+!@#$%^&*()_+{}[\]:;<>,.?~\\/-=""]/g;
  const result = inputString.replace(regex, "").toLowerCase();
  return result;
}
export function removeSpecialCharactersExceptWhiteSpace(inputString: string) {
  const regex = /[+!@#$%^&*()_+{}[\]:;<>,.?~\\/-=""]/g;
  const result = inputString.replace(regex, "");
  return result;
}
