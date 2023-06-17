// function to convert camel case to words
export const camelToWords = (str: string) => {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};
