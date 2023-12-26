export function removeSpecialCharacters(inputString: string) {
  // Use a regular expression to match any character that is not a letter or a number

  const regex = /[\s°+!@#$%^&*()_+{}\[\]:;<>,.?~\\/-=""]/g;
  const result = inputString.replace(regex, "");

  return result;
}
export function removeSpecialCharactersExceptWhiteSpace(inputString: string) {
  // Use a regular expression to match any character that is not a letter or a number

  const regex = /[+!@#$%^&*()_+{}\[\]:;<>,.?~\\/-=""]/g;
  const result = inputString.replace(regex, "");

  return result;
}
