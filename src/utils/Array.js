export async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(i, array[i]);
  }
}

export function split(array, size) {
  const clonedArray = [...array];
  const batches = [];
  while (clonedArray.length) {
    batches.push(clonedArray.splice(0, size));
  }
  return batches;
}
