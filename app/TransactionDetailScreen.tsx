import React from "react";
import tw from "twrnc";
import { useLocalSearchParams } from "expo-router"
import formatDate from "./utils/formatDate";

import { View, Text, SafeAreaView } from "react-native";
import CustomHeader from "./components/CustomHeader";

export default function TransactionDetailScreen() {

    // Retrieve the transaction parameter from navigation
    const { transaction } = useLocalSearchParams();

    // Parse transaction JSON string into object 
    const transactionData = transaction ? JSON.parse(transaction as string) : null;

    return (
        <SafeAreaView style={tw`flex-1 items-center bg-slate-50`}>
            <View style={tw`flex-1 w-100 px-4`}>
                <CustomHeader header="Transaction Detail" />

                {transactionData ? (
                    <View>
                        <CustomHeader header={transactionData.description} />
                        <CustomHeader header={transactionData.amount} size="lg" />
                        <CustomHeader header={transactionData.type} size="lg" />
                        <CustomHeader header={formatDate(transactionData.date)} size="lg" />
                        <CustomHeader header={transactionData.id} size="lg" />
                    </View>
                ) : (
                    <Text style={tw`text-center text-gray-500 p-4`}>No transaction data</Text>
                )}
            </View>
        </SafeAreaView>
    )
}