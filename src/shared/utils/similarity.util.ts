export function similarityScore(s1: string = "", s2: string = "") {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  let longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  let matchCount = 0;
  for (let i = 0; i < longerLength; i++) {
    if (longer[i] === shorter[i]) {
      matchCount++;
    }
  }
  return (matchCount / longerLength) * 100 ?? 0;
}
