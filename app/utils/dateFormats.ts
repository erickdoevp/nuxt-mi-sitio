export const dayMonthYearFormat2 = (date: Date) => {
  return date.toLocaleString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};