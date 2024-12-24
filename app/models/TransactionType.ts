export default interface TransactionType {
    id: string;
    amount: number;
    date: string;
    description: string;
    direction: string;
    paymentMethod: string;
    status: string;
}