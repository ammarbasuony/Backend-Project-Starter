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
