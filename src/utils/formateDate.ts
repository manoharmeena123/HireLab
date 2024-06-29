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

// dateUtils.ts

export function formaterDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}


//Date ago
export const formatDateAgo = (createdAt :string):string => {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);
  
  // Calculate the difference in milliseconds
  const timeDiff = currentDate.getTime() - createdDate.getTime();
  
  // Calculate different units of time
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  
  // Return the formatted string
  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  }
}