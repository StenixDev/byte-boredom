export function convertToTime(time?: string) {
  if (!time) return '';

  const date = new Date(time);

  if (isNaN(date.getTime())) return '';

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
