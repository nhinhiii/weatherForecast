export function capitalizeWords(str) {
  str = str.toLowerCase();
  const words = str.split(" ");

  const capitalizeFirstLetter = words.map((word) => {
    if (word.length === 0) {
      return "";
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizeFirstLetter.join(" ");
}
