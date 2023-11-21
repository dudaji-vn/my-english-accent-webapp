export function getShuffledArr<T>(arr: T[]) {
  return arr.reduce(
    (newArr, _, i) => {
      let rand = i + Math.floor(Math.random() * (newArr.length - i));
      [newArr[rand], newArr[i]] = [newArr[i], newArr[rand]];
      return newArr;
    },
    [...arr]
  );
}
