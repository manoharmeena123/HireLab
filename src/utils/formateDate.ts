export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);

  // Extract day, month, and year from the Date object
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-indexed, so we add 1
  const year = date.getUTCFullYear();

  // Format the date in the desired format
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};
