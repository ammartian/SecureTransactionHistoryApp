import React from "react";
import Feather from '@expo/vector-icons/Feather';

type DirectionIconProps = {
    direction: string;
    size?: number;
}

export default function DirectionIcon({ direction, size = 24 }: DirectionIconProps) {

    // Set icon name and color based on direction
    const iconName = direction === "Income" ? "arrow-down-left" : "arrow-up-right";
    const iconColor = direction === "Income" ? "#22c55e" : "#ef4444";

    return <Feather name={iconName} size={size} color={iconColor} />
}