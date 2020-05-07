import DataLoader from 'dataloader';

/**
 * Create a dataloader instance for a request and type
 *
 */
const createLoader = (batchFn, indexField = 'id', oneToMany = false) => (
  options,
) => {
  return new DataLoader(async (keys) => {
    const rows = await batchFn(keys);

    if (oneToMany) {
      const grouped = rows.reduce(
        (r, v, i, a, k = v[indexField]) => ((r[k] || (r[k] = [])).push(v), r),
        {},
      );
      return keys.map((key) => grouped[key]);
    }
    return keys.map((key) => rows.find((row) => row[indexField] === key));
  }, options);
};

export default createLoader;
