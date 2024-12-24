import React from "react";
import tw from "twrnc";
import { useLocalSearchParams, useRouter } from "expo-router"
import { formatDate, setStatusColor } from "./utils/transactionUtils";

import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import CustomHeader from "./components/CustomHeader";
import AntDesign from "@expo/vector-icons/AntDesign";
import TransactionDirectionIcon from "./components/TransactionDirectionIcon";
import TransactionDetailRow from "./components/TransactionDetailRow";

export default function TransactionDetailScreen() {

    // Retrieve the transaction parameter from navigation
    const { transaction } = useLocalSearchParams();

    // Parse transaction JSON string into object 
    const transactionData = transaction ? JSON.parse(transaction as string) : null;

    const router = useRouter();

    return (
        <SafeAreaView style={tw`flex-1 bg-stone-100`}>
            <View style={tw`flex-1 items-center p-4`}>

                {/* Back Arrow */}
                <TouchableOpacity
                    style={tw`self-start mb-8`}
                    onPress={() => router.back()} >
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>

                {transactionData ? (
                    <View style={tw`flex-1 w-full`}>
                        {/* Transaction Amount, Direction & Status */}
                        <View style={tw`self-start`}>
                            <View style={tw`flex-row`}>
                                <CustomHeader header={`RM ${transactionData.amount}`} style={tw`text-4xl mr-2`} />
                                <TransactionDirectionIcon direction={transactionData.direction} size={36} />
                            </View>
                            <View style={tw`flex-row w-full justify-between items-center`}>
                                <Text style={tw`text-lg text-gray-500`}>{transactionData.direction}</Text>
                                <Text style={tw` text-lg ${setStatusColor(transactionData.status)}`}>{transactionData.status}</Text>
                            </View>
                        </View>

                        {/* Horizontal Line */}
                        <View style={tw`h-px w-full self-center bg-gray-300 my-6`} />

                        <View style={tw`self-start mb-2`}>
                            <CustomHeader header="Transaction Details" size="lg" style={tw`mt-2 mb-1`} />
                        </View>

                        {/* Transaction Details */}
                        <View
                            style={[
                                tw`flex-col w-full bg-white rounded-lg border-gray-300 p-4 gap-4`,
                                {
                                    shadowColor: '#000', // iOS shadow color
                                    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
                                    shadowOpacity: 0.1, // iOS shadow opacity
                                    shadowRadius: 4, // iOS shadow radius
                                    elevation: 4, // Android elevation for shadow
                                },
                            ]}>
                            <TransactionDetailRow label="Description" value={transactionData.description} />
                            <TransactionDetailRow label="Amount" value={`RM ${transactionData.amount}`} />
                            <TransactionDetailRow label="Payment Method" value={transactionData.paymentMethod} />
                            <TransactionDetailRow label="Date" value={formatDate(transactionData.date)} />
                            <TransactionDetailRow label="Activity" value={transactionData.direction} />
                            <TransactionDetailRow label="Transaction ID" value={transactionData.id} />
                        </View>
                    </View>
                ) : (
                    // Fallback view
                    <Text style={tw`text-center text-lg text-gray-500 p-4`}>No transaction data</Text>
                )}
            </View>
        </SafeAreaView >
    )
}