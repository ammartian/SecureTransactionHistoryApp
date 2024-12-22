// Transaction History Screen

// TODO:
// Import all of the data in FlatList
// Mask and unmasked function + authenticate check
// Authentication fallback
// Pull to refresh
// Transaction Details + authenticate check

import React, { useState } from "react";
import tw from "twrnc";
import { transactions } from "./data/transactions";

import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import CustomHeader from "./components/CustomHeader";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import authenticateUser from "./services/auth";

export default function TransactionHistoryScreen() {

    const [isDisplayed, setIsDisplayed] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Helper function to transform date format
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // ensure it's always 2 digit
        const month = date.toLocaleString('en-US', { month: 'short' }); // converts month into short name
        const year = date.getFullYear(); // get full year
        return `${day} ${month} ${year}`; // return re-arranged template literal 
    };

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


    return (
        <SafeAreaView style={tw`flex-1 items-center bg-slate-50`}>
            <View style={tw`flex-1 w-100 px-4`}>

                {/* Header and Button */}
                <View style={tw`flex flex-row justify-between`}>
                    <CustomHeader header="Transaction History" />

                    <TouchableOpacity style={tw`flex-row items-center pb-4 pr-4`} onPress={displaySensitiveInfo}>
                        <View style={tw`px-6 py-2 bg-gray-300 rounded-lg`}>
                            {isDisplayed ?
                                <Entypo name="eye" size={16} color="black" />
                                : <Entypo name="eye-with-line" size={16} color="black" />}
                        </View>
                    </TouchableOpacity>
                </View>

                {/* FlatList */}
                <View style={tw`border-2 border-slate-300 rounded-lg overflow-hidden mb-16`}>
                    <FlatList
                        data={transactions}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={tw`flex-1 flex-row justify-between p-5 ${index % 2 === 0 ? "bg-slate-50" : "bg-slate-100"}`}
                                onPress={() => console.log("Pressed!")}>
                                <View style={tw`flex-col flex-wrap max-w-[50%]`}>
                                    <CustomHeader header={item.description} size="lg" style={tw`mt-0 mb-0`} />
                                    {item.type && (<Text>{item.type}</Text>)}
                                    <Text>{formatDate(item.date)}</Text>
                                </View>
                                <View style={tw`flex-col flex-wrap max-w-[50%] justify-between items-end pt-1`}>
                                    {isDisplayed ?
                                        <CustomHeader header={`RM ${item.amount}`} size="base" />
                                        : <CustomHeader header="RM ***" size="base" />}
                                    <AntDesign name="right" size={16} style={tw`self-end text-slate-400`} />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
