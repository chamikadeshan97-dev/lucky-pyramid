export function formatDateTime(value) { return new Date(value).toLocaleString(); }
export function makePyramidRows(numbers) {
  const result = []; let offset = 0;
  for (let size = 1; offset < numbers.length; size++) { result.push(numbers.slice(offset, offset + size)); offset += size; }
  return result;
}
