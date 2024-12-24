// Transaction History Screen

// TODO:
// Last: Clean up code and improvise 

import React, { useState } from "react";
import tw from "twrnc";
import { transactions as InitialTransactions } from "./data/transactions";
import { sortByLatestDate, formatDate, setDirectionColor, setStatusColor } from "./utils/utils";
import { useRouter } from "expo-router";

import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, View, Text, TouchableOpacity, RefreshControl } from "react-native";
import CustomHeader from "./components/CustomHeader";
import Entypo from '@expo/vector-icons/Entypo';
import authenticateUser from "./services/auth";
import TransactionType from "./models/transaction-type";
import DirectionIcon from "./components/DirectionIcon";

export default function TransactionHistoryScreen() {

    const router = useRouter();

    const [isDisplayed, setIsDisplayed] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [transactions, setTransactions] = useState(() => sortByLatestDate(InitialTransactions)) // sort data in descending order

    // Handle authentication
    const authenticateUserAndSetState = async () => {
        try {
            const auth = await authenticateUser();

            if (auth) {
                setIsAuthenticated(true);
                return true;
            } else {
                console.log("Authentication Failed");
                return false;
            }
        } catch (error) {
            console.error("Authentication Error: ", error);
            return false;
        }
    }

    // Handle display toggle
    const displaySensitiveInfo = async () => {
        if (isAuthenticated) {
            setIsDisplayed((prevState) => !prevState); // toggle freely
        } else {
            // authenticate and set state
            const authSuccess = await authenticateUserAndSetState();

            if (authSuccess) {
                setIsDisplayed(true); // display info after authenticated
            }
        }
    }

    // Handle navigation to transaction detail
    const handleTransactionDetailNavigation = async (transaction: TransactionType) => {
        if (isAuthenticated) {
            navigateToDetail(transaction); // navigate directly if authenticated
        } else {
            // authenticate and set state
            const authSuccess = await authenticateUserAndSetState();

            if (authSuccess) {
                navigateToDetail(transaction); // navigate after successful authentication
            }
        }
    }

    // Navigate to transaction detail screen with params
    const navigateToDetail = (transaction: TransactionType) => {
        router.push({
            pathname: "/TransactionDetailScreen",
            params: { transaction: JSON.stringify(transaction) }
        })
    }

    // Handle refresh
    const onRefresh = async () => {
        setRefreshing(true); // start loading animation

        // Simulate data fetching with delay
        try {
            // Data fetch with 2s delay
            await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (error) {
            console.error("Error Fetching Data", error);
        } finally {
            setRefreshing(false); // stop loading animation
        }
    }

    return (
        <SafeAreaView style={tw`flex-1 bg-stone-100`}>
            <View style={tw`flex-1 items-center`}>

                {/* Header and Button */}
                <View style={tw`flex flex-row w-full justify-between pt-8 px-4 pb-4`}>
                    <CustomHeader header="Transaction History" style={tw`pt-2`} />
                    <TouchableOpacity style={tw`flex-row items-center pr-4`} onPress={displaySensitiveInfo}>
                        <View style={tw`px-7 py-2 bg-yellow-300 rounded-lg`}>
                            {/* Toggle icon */}
                            <Entypo name={isDisplayed ? "eye" : "eye-with-line"} size={16} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* FlatList */}
                <View style={tw`w-full bg-white pb-16`}>
                    <FlatList
                        data={transactions}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={<Text style={tw`text-center text-gray-500 p-4`}>No transaction available</Text>} // empty data fallback view
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={tw`flex-1 flex-row justify-between px-6 py-4`}
                                // Navigate to Transaction Detail
                                onPress={() => handleTransactionDetailNavigation(item)}>

                                {/* Transaction history details */}
                                <View style={tw`flex-col flex-wrap max-w-[50%]`}>
                                    <View style={tw`flex-row items-center`}>
                                        <CustomHeader header={item.description} size="lg" style={tw`pt-1`} />
                                        <DirectionIcon direction={item.direction} size={24} style={tw`ml-1`} />
                                    </View>
                                    <Text style={tw`text-gray-500`}>{item.paymentMethod}</Text>
                                    <Text style={tw`text-gray-500`}>{formatDate(item.date)}</Text>
                                </View>

                                {/* Amount & Status */}
                                <View style={tw`flex-col flex-wrap max-w-[50%] items-end pt-1`}>
                                    {/* Toggle amount visibility */}
                                    <CustomHeader
                                        header={isDisplayed ? `RM ${item.amount}` : "RM ***"}
                                        size="base"
                                        style={tw`self-end`} />
                                    <Text style={tw`text-sm ${setStatusColor(item.status)}`}>{item.status}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
