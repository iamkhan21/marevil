const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDateToHR(date: Date | string | number) {
  if (!date) return "Invalid date.";
  const d = new Date(date);
  const month = monthNames[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes();

  const nowIsSameYear = year === new Date().getFullYear();
  const dateYear = nowIsSameYear ? `` : `, ${year}`;
  return `${month} ${day}${dateYear}, ${hours}:${minutes}`;
}
