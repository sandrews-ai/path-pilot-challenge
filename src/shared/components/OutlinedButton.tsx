import { Typography } from '@mui/material';
import { CSSProperties } from 'react';
import { AppColors } from '../../theme/AppTheme';
import ClickableOpacityDiv from './ClickableOpacityDiv';

interface OutlinedButtonProps {
    disabled?: boolean;
    title: string;
    paddingHorizontal?: string;
    height?: string;
    onClick?: () => void;
    style?: CSSProperties
}
const OutlinedButton = (props: OutlinedButtonProps) => {
    return (
        <ClickableOpacityDiv disabled={props.disabled || !props.onClick} style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: !!props.paddingHorizontal ? undefined : '100%',
            minHeight: props.height ?? '60px',
            cursor: 'pointer',
            borderRadius: '12px',
            paddingLeft: props.paddingHorizontal,
            paddingRight: props.paddingHorizontal,
            border: `1px solid ${AppColors.grey.borderDark}`,
            background: AppColors.white,
            ...props.style,
        }} onClick={() => {
            if (!props.disabled && props.onClick)
                props.onClick()
        }}>
            <Typography variant='h3' style={{ color: AppColors.grey.borderDark }}>
                {props.title}
            </Typography>
        </ClickableOpacityDiv>
    )
}

export default OutlinedButton