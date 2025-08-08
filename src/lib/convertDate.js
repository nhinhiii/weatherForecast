export function convertDate(timeDate, timeZone) {
  const utcSeconds = timeDate;
  const cityOffsetSeconds = timeZone;
  const correctedTimestamp = (utcSeconds + cityOffsetSeconds) * 1000;
  const cityDate = new Date(correctedTimestamp);
  const options = {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  };
  const formattedDate = cityDate.toLocaleDateString("en-US", options);
  return formattedDate;
}
