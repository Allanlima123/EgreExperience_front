export const formatDate = (dateString) => {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");
  
  if (!year || !month || !day) return "";

  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
};