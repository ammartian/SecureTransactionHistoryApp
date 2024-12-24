import React from "react";
import tw from "twrnc";
import Feather from '@expo/vector-icons/Feather';
import { setDirectionColor } from "../utils/transactionUtils";

type TransactionDirectionIconProps = {
    direction: string;
    size?: number;
    style?: object;
}

export default function TransactionTransactionDirectionIcon({ direction, size = 24, style }: TransactionDirectionIconProps) {

    // Set icon name and color based on direction
    const iconName = direction === "Income" ? "arrow-down-left" : "arrow-up-right";
    const iconColor = setDirectionColor(direction);


    return <Feather name={iconName} size={size} style={[tw`${iconColor}`, style]} />
}