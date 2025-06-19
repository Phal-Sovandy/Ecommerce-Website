export default function priceFormat(priceInCents) {
  return (priceInCents / 100).toFixed(2);
}
