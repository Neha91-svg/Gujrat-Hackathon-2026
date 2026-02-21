export const today = () => new Date();

export const daysBetween = (a, b) => {
  const diff = Math.abs(new Date(a) - new Date(b));
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};