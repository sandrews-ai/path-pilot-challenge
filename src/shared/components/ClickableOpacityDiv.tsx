import { Box } from '@mui/material';
import React, { ReactNode, useState } from 'react';

interface ClickableOpacityDivProps {
    id?: string;
    disabled?: boolean;
    children: ReactNode;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
    gradientBorder?: boolean;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement> | undefined;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const ClickableOpacityDiv = (props: ClickableOpacityDivProps) => {
    const { onClick, children, disabled, gradientBorder, id } = props;
    const [isPressed, setIsPressed] = useState(false);

    const handleTouchStart = () => {
        setIsPressed(true);
    };

    const handleTouchEnd = () => {
        setIsPressed(false);
    };
    const borderProperties = {
        border: '3px solid transparent',
        background: 'linear-gradient(white, white), radial-gradient(circle at top left, #96EAF1, #CA54D2)',
        backgroundClip: 'padding-box, border-box',
        backgroundOrigin: 'border-box',
    }
    return (
        <Box
            id={id}
            sx={{
                opacity: (!disabled && isPressed) ? 0.5 : 1,
                // position: 'relative',
                transition: 'opacity 0.1s ease-in-out',
                border: gradientBorder ? '3px solid transparent' : props.style?.border,
                '&:hover': {
                    cursor: 'pointer',
                    opacity: (disabled || gradientBorder) ? 1 : (isPressed ? 0.5 : 0.8),
                    ...(gradientBorder ? borderProperties : {}),
                },
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
                ...props.style,
            }}
            onClick={onClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onMouseLeave={(e) => {
                handleTouchEnd();
                props.onMouseLeave?.(e);
            }}
            onMouseEnter={props.onMouseEnter}
        >
            {children}
        </Box>

    )
}

export default ClickableOpacityDiv;