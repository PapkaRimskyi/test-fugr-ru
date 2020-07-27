export default function getCertainCountsItem(data, maxLength, sliceFrom) {
  if (data.length > maxLength) {
    console.log(data.slice(sliceFrom - 1, sliceFrom + maxLength));
    return data.slice(sliceFrom - 1, sliceFrom + maxLength);
  }
  return data;
}
