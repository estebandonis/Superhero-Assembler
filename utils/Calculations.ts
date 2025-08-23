export const powerLevelCalculation = (obj: Record<string, any>): number => {
  const values = Object.values(obj);
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  const total = sum / values.length;
  return parseInt(total.toFixed(2));
};
