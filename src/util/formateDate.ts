export const formatDate = (dateString: string, format: string) => {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const date = String(dateObject.getDate()).padStart(2, '0');
  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');

  if (format === 'YYYY년 MM월 DD일 HH:MM') {
    return `${year}년 ${month}월 ${date}일 ${hours}:${minutes}`;
  } else if (format === 'MM.DD') {
    return `${month}.${date} ${hours}:${minutes}`;
  }
};
