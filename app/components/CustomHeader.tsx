import React from "react"
import { Text } from "react-native";
import tw from "twrnc"

type CustomeHeaderProps = {
    header: string;
    size?: string;
    style?: object;
}


export default function CustomHeader({ header, size = "xl", style }: CustomeHeaderProps) {
    return (
        <Text style={[tw`text-${size} font-bold mb-4 self-start`, style]}>{header}</Text>
    )
}