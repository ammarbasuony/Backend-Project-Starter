// function to convert camel case to words
export const camelToWords = (str: string) => {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

// function to check if a string is a valid date
export const isDate = (date: string) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
};