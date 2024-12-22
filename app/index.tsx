// Transaction History Screen

// TODO:
// Import all of the data in FlatList
// Mask and unmasked function + authenticate check
// Authentication fallback
// Transaction Details + authenticate check

import React, { useState } from "react";
import tw from "twrnc";
import { transactions } from "./data/transactions";

import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import CustomHeader from "./components/CustomHeader";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function TransactionHistoryScreen() {

    const [isDisplayed, setIsDisplayed] = useState(true);

    // Helper function to transform date format
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // ensure it's always 2 digit
        const month = date.toLocaleString('en-US', { month: 'short' }); // converts month into short name
        const year = date.getFullYear(); // get full year
        return `${day} ${month} ${year}`; // return re-arranged template literal 
    };

    // Handle masking
    function displaySensitiveInfo() {
        setIsDisplayed(!isDisplayed);
    }


    return (
        <SafeAreaView style={tw`flex-1 items-center bg-slate-50`}>
            <View style={tw`flex-1 w-100 px-4`}>

                <View style={tw`flex flex-row justify-between`}>
                    <CustomHeader header="Transaction History" />

                    <TouchableOpacity style={tw`flex-row items-center pb-4 pr-4`} onPress={displaySensitiveInfo}>
                        <View style={tw`px-6 py-2 bg-gray-300 rounded-lg`}>
                            {isDisplayed ?
                                <Entypo name="eye-with-line" size={16} color="black" />
                                : <Entypo name="eye" size={16} color="black" />}
                        </View>
                    </TouchableOpacity>
                </View>

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
                                        <CustomHeader header="RM ***" size="md" />
                                        : <CustomHeader header={`RM ${item.amount}`} size="md" />}
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
