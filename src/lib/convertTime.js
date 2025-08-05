export function convertTime(timeStamp, timeZone) {
  const date = new Date(timeStamp * 1000);
  const utcHours = date.getUTCHours();
  const utcMinutes = date.getUTCMinutes();

  //caculate timeZone
  const localHours = (utcHours + timeZone / 3600 + 24) % 24;
  const localMinutes = utcMinutes;

  const timeFormat = localHours >= 12 ? "PM" : "AM";
  let formattedHours = localHours % 12;
  formattedHours = formattedHours ? formattedHours : 12;
  const formattedMinutes =
    localMinutes < 10 ? "0" + localMinutes : localMinutes;

  return `${formattedHours}:${formattedMinutes} ${timeFormat}`;
}

// console.log(convertTime(1726636384, 7200));
