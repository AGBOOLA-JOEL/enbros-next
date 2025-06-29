export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  // Get parts
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const dayNumber = date.getDate();
  const monthName = date.toLocaleDateString("en-US", { month: "long" });
  const year = date.getFullYear();

  let hour = date.getHours();
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;

  // Add ordinal suffix to day
  const ordinal = (n: number) => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  return `${dayName}, ${ordinal(
    dayNumber
  )} ${monthName} ${year} (${hour}${ampm})`;
}
