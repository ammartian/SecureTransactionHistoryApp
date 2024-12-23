import TransactionType from "../models/transaction-type";


// Helper function to sort Data by descending order
export const sortByLatestDate = (data: TransactionType[]): TransactionType[] => {
    return [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};


// Helper function to transform date format
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // ensure it's always 2 digit
    const month = date.toLocaleString('en-US', { month: 'short' }); // converts month into short name
    const year = date.getFullYear(); // get full year
    return `${day} ${month} ${year}`; // return re-arranged template literal 
};

// Helper function to set status title color
export const setStatusColor = (status: string) => {
    switch (status) {
        case "Completed":
            return "text-green-500";
        case "Pending":
            return "text-yellow-500";
        case "Failed":
            return "text-red-500";
        default:
            return "text-gray-500"; // Default color for unknown statuses
    }
}

