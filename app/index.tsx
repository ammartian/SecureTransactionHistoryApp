// Transaction History Screen

// TODO:
// Import all of the data in FlatList
// Mask and unmasked function + authenticate check
// Authentication fallback
// Pull to refresh
// Transaction Details + authenticate check

import React, { useState } from "react";
import tw from "twrnc";
import { transactions as InitialTransactions } from "./data/transactions";
import sortByLatestDate from "./utils/sortDate";
import formatDate from "./utils/formatDate";
import { useRouter } from "expo-router";

import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, View, Text, TouchableOpacity, RefreshControl } from "react-native";
import CustomHeader from "./components/CustomHeader";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import authenticateUser from "./services/auth";
import TransactionType from "./models/transaction-type";

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
            // authenticate if not
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
            // authenticate if not
            const authSuccess = await authenticateUserAndSetState();

            if (authSuccess) {
                navigateToDetail(transaction); // navigate after successful authentication
            }
        }
    }

    // Navigate to transaction detail screen
    const navigateToDetail = (transaction: TransactionType) => {
        // navigate
        router.push({
            pathname: "/TransactionDetailScreen",
            params: { transaction: JSON.stringify(transaction) }
        })
        console.log("Navigated with props: ", transaction);
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
        <SafeAreaView style={tw`flex-1 items-center bg-slate-50`}>
            <View style={tw`flex-1 w-100 px-4`}>

                {/* Header and Button */}
                <View style={tw`flex flex-row justify-between`}>
                    <CustomHeader header="Transaction History" />

                    <TouchableOpacity style={tw`flex-row items-center pb-4 pr-4`} onPress={displaySensitiveInfo}>
                        <View style={tw`px-6 py-2 bg-gray-300 rounded-lg`}>
                            {/* Toggle icon */}
                            <Entypo name={isDisplayed ? "eye" : "eye-with-line"} size={16} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* FlatList */}
                <View style={tw`border-2 border-slate-300 rounded-lg overflow-hidden mb-16`}>
                    <FlatList
                        data={transactions}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={<Text style={tw`text-center text-gray-500 p-4`}>No transaction available</Text>} // empty data fallback view
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={tw`flex-1 flex-row justify-between p-5 ${index % 2 === 0 ? "bg-slate-50" : "bg-slate-100"}`}
                                // Navigate to Transaction Detail
                                onPress={() => handleTransactionDetailNavigation(item)}>
                                <View style={tw`flex-col flex-wrap max-w-[50%]`}>
                                    <CustomHeader header={item.description} size="lg" style={tw`mt-0 mb-0`} />
                                    {item.paymentMethod && (<Text>{item.paymentMethod}</Text>)}
                                    <Text>{formatDate(item.date)}</Text>
                                </View>
                                <View style={tw`flex-col flex-wrap max-w-[50%] justify-between items-end pt-1`}>
                                    {/* Toggle amount visibility */}
                                    <CustomHeader header={isDisplayed ? `RM ${item.amount}` : "RM ***"} size="base" />
                                    <AntDesign name="right" size={16} style={tw`self-end text-slate-400`} />
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
