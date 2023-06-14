// Format date to e.g. 10 Nov 2022, 9:23 pm
export const formatDate = (date: Date): string => {
  const options: any = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }
  return new Date(date).toLocaleDateString('en-GB', options)
}

// Convert camelCase to capitalized words
export const capitalize = (s: string) => {
  return s.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase()
  })
}

// Capitalize first letter of a string and make it singular
export const singularize = (s: string) => {
  return capitalize(s.slice(0, -1))
}
