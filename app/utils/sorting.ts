import { TransactionType } from "../models/transaction-type";

// Helper function to sort Data by descending order
export const sortByLatestDate = (data: TransactionType[]): TransactionType[] => {
    return [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};