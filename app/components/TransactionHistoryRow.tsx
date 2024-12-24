import React from "react";
import tw from "twrnc";
import { TouchableOpacity, View, Text } from "react-native";
import CustomHeader from "./CustomHeader";
import DirectionIcon from "./DirectionIcon";
import { setStatusColor, formatDate } from "../utils/utils";

type TransactionRowProps = {
    transaction: {
        id: string;
        description: string;
        paymentMethod: string;
        date: string;
        amount: number;
        status: string;
        direction: string;
    };
    isDisplayed: boolean;
    onPress: () => void;
}

export default function TransactionHistoryRow({ transaction, isDisplayed, onPress }: TransactionRowProps) {
    return (
        <TouchableOpacity
            style={tw`flex-1 flex-row justify-between px-6 py-4`}
            // Navigate to Transaction Detail
            onPress={onPress}>

            {/* Transaction history details */}
            <View style={tw`flex-col flex-wrap max-w-[50%]`}>
                <View style={tw`flex-row items-center`}>
                    <CustomHeader header={transaction.description} size="lg" style={tw`pt-1`} />
                    <DirectionIcon direction={transaction.direction} size={24} style={tw`ml-1`} />
                </View>
                <Text style={tw`text-gray-500`}>{transaction.paymentMethod}</Text>
                <Text style={tw`text-gray-500`}>{formatDate(transaction.date)}</Text>
            </View>

            {/* Amount & Status */}
            <View style={tw`flex-col flex-wrap max-w-[50%] items-end pt-1`}>
                {/* Toggle amount visibility */}
                <CustomHeader
                    header={isDisplayed ? `RM ${transaction.amount}` : "RM ***"}
                    size="base"
                    style={tw`self-end`} />
                <Text style={tw`text-sm ${setStatusColor(transaction.status)}`}>{transaction.status}</Text>
            </View>
        </TouchableOpacity>
    )
}