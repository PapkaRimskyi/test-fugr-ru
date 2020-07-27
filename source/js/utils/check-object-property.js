export default function checkObjectProperty(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}
