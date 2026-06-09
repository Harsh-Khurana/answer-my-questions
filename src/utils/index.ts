export function getRandomizedArray<T>(arr: T[]) {
  const newArr = [...arr]

  for (let i = arr.length - 1; i > 0; i--) {
    const randomIdx = Math.floor(Math.random() * i)
    const temp = newArr[randomIdx]
    newArr[randomIdx] = newArr[i]
    newArr[i] = temp
  }

  return newArr
}

export * from "./route-helpers"
export * from "./type-guards"
