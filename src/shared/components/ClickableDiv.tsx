import { Box } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import { AppColors } from '../../theme/AppTheme';

interface ClickableDivProps {
    children: ReactNode;
    inactiveColor?: string;
    hoverColor?: string;
    pressedColor?: string;
    style?: React.CSSProperties;
    onClick: () => void;
}

const ClickableDiv = (props: ClickableDivProps) => {
    const { onClick, children } = props;
    const pressedColor = props.pressedColor ? props.pressedColor : AppColors.grey.light;
    const inactiveColor = props.inactiveColor ? props.inactiveColor : AppColors.white;
    const hoverColor = props.hoverColor ? props.hoverColor : AppColors.grey.lightest;
    const [isPressed, setIsPressed] = useState(false);

    const handleTouchStart = () => {
        setIsPressed(true);
    };

    const handleTouchEnd = () => {
        setIsPressed(false);
    };
    return (
        <Box
            sx={{
                backgroundColor: isPressed ? pressedColor : inactiveColor,
                position: 'relative',
                transition: 'opacity 0.1s ease-in-out',
                ...props.style,
                '&:hover': {
                    backgroundColor: isPressed ? pressedColor : hoverColor,
                    cursor: 'pointer',
                }
            }}
            onClick={onClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
        >
            {children}
        </Box>

    )
}

export default ClickableDiv