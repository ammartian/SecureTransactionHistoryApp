// Helper function to transform date format
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // ensure it's always 2 digit
    const month = date.toLocaleString('en-US', { month: 'short' }); // converts month into short name
    const year = date.getFullYear(); // get full year
    return `${day} ${month} ${year}`; // return re-arranged template literal 
};