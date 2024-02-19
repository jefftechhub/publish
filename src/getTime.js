export const getTime = (time) => {
  const prevDate = new Date(time);
  const millisec = new Date() - prevDate;

  const seconds = Math.floor(millisec / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const year = Math.floor(months / 12);

  let label = "";

  if (year > 0) {
    label = `${year > 1 ? `${year} years ago` : `A year ago`}`;
  } else if (months > 0) {
    label = `${months > 1 ? `${months} months ago` : `A month ago`}`;
  } else if (days > 0) {
    label = `${days > 1 ? `${days} days ago` : `A day ago`}`;
  } else if (hours > 0) {
    label = `${hours > 1 ? `${hours} hours ago` : `A hour ago`}`;
  } else if (minutes > 0) {
    label = `${minutes > 1 ? `${minutes} minutes ago` : `A mimute ago`}`;
  } else {
    label = `${seconds > 1 ? `${seconds} seconds ago` : `A second ago`}`;
  }

  return label;
};
