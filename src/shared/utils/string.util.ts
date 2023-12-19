export function removeSpecialCharacters(inputString: string) {
  // Use a regular expression to match any character that is not a letter or a number
  var pattern = /[^a-zA-Z0-9,.\s]/g;

  // Replace all occurrences of special characters with an empty string
  var result = inputString.replace(pattern, "");

  return result;
}
