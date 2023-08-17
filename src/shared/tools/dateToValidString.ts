const months: { [key: string]: string } = {
  "1": "January",
  "2": "February",
  "3": "March",
  "4": "April",
  "5": "May",
  "6": "June",
  "7": "July",
  "8": "August",
  "9": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

export const dateToValidString = (date: Date): string => {
  const dateInfo: Array<string> = date?.toString().slice(0, 10).split("-");

  const day = parseInt(dateInfo[2]);
  const month = months[parseInt(dateInfo[1])];
  const year = dateInfo[0];

  return " " + month + " " + day + ", " + year + " ";
};
