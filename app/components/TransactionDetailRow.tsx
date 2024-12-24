import React from "react";
import tw from "twrnc";
import { View, Text } from "react-native";

type TransactionDetailRowProps = {
    label: string;
    value: string;
    labelStyle?: object;
    valueStyle?: object;
}

export default function TransactionDetailRow({ label, value, labelStyle, valueStyle }: TransactionDetailRowProps) {
    return (
        <View style={tw`flex-row justify-between flex-wrap`}>
            <Text style={[tw`w-[40%] text-lg text-gray-500`, labelStyle]}>{label}</Text>
            <Text style={[tw`w-[60%] text-lg text-right`, valueStyle]}>{value}</Text>
        </View>
    )
}