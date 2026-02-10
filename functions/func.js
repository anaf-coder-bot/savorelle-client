export default function formatMoney(amount) {
  return (Math.round((amount + Number.EPSILON) * 100) / 100).toFixed(2);
};