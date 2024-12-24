// Transaction History Screen

import React, { useState } from "react";
import tw from "twrnc";
import { transactions as InitialTransactions } from "./data/transactions";
import { sortByLatestDate } from "./utils/transactionUtils";
import { useRouter } from "expo-router";

import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, View, Text, TouchableOpacity, RefreshControl, Alert } from "react-native";
import CustomHeader from "./components/CustomHeader";
import Entypo from '@expo/vector-icons/Entypo';
import authenticateUser from "./services/auth";
import TransactionType from "./models/TransactionType";
import TransactionHistoryRow from "./components/TransactionHistoryRow";

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
                Alert.alert("Authentication Failed");
                return false;
            }
        } catch (error) {
            console.error("Authentication Error: ", error);
            Alert.alert("Error", "An unexpected error occurred during authentication.");
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

            // Reload transactions
            setTransactions(sortByLatestDate(InitialTransactions));
        } catch (error) {
            console.error("Error Fetching Data", error);
            Alert.alert("Error", "Unable to refresh transactions.");
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
                        <View style={[
                            tw`px-7 py-2 bg-yellow-300 rounded-lg`,
                            {
                                shadowColor: '#000', // Shadow color for iOS
                                shadowOffset: { width: 0, height: 2 }, // Shadow position
                                shadowOpacity: 0.1, // Shadow opacity for iOS
                                shadowRadius: 4, // Shadow blur radius for iOS
                                elevation: 4, // Shadow effect for Android
                            },
                        ]}>
                            {/* Toggle icon */}
                            <Entypo name={isDisplayed ? "eye" : "eye-with-line"} size={16} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* FlatList */}
                <View style={[tw`w-full bg-white pb-16`,
                {
                    shadowColor: '#000', // Shadow color for iOS
                    shadowOffset: { width: 0, height: -2 }, // Top shadow
                    shadowOpacity: 0.1, // Shadow opacity for iOS
                    shadowRadius: 4, // Blur radius for iOS
                    elevation: 4, // Shadow for Android
                },]}>
                    <FlatList
                        data={transactions}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={<Text style={tw`text-center text-gray-500 p-4`}>No transaction available</Text>} // empty data fallback view
                        renderItem={({ item }) => (
                            <TransactionHistoryRow
                                transaction={item}
                                isDisplayed={isDisplayed}
                                onPress={() => handleTransactionDetailNavigation(item)}
                            />
                        )}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                </View>
            </View>
        </SafeAreaView >
    );
}
