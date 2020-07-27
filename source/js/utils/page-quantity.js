export default function pageQuantity(itemLength, maxItemInPage) {
  if (itemLength % maxItemInPage) {
    return Math.floor(itemLength / maxItemInPage) + 1;
  }
  return itemLength / maxItemInPage;
}
