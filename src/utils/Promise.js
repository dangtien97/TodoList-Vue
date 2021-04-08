import { asyncForEach, split } from "@/utils/Array";

export function wait(timer) {
  return new Promise((resolve) => setTimeout(resolve, timer));
}

export function lazyBatchesPromise({
  asyncFactoryFunction,
  items = [],
  batchSize = 1,
  delay = 0,
}) {
  return new Promise((resolve, reject) => {
    const output = [];
    const batches = split(items, batchSize);
    asyncForEach(batches, async (key, batch) => {
      const promises = batch
        .map(asyncFactoryFunction)
        .map((promise) => promise.catch(reject));
      const results = await Promise.all(promises);
      output.push(...results);
      await wait(delay);
    }).then(() => resolve(output));
  });
}
