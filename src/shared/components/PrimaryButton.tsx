import { Typography } from '@mui/material';
import { CSSProperties } from 'react';
import { AppColors } from '../../theme/AppTheme';
import ClickableOpacityDiv from './ClickableOpacityDiv';

interface PrimaryButtonProps {
    id?: string;
    disabled?: boolean;
    title: string;
    paddingHorizontal?: string;
    height?: string;
    onClick?: () => void;
    style?: CSSProperties;
    smallText?: boolean;
    backgroundColor?: string;
    marginTop?: string;
}
const PrimaryButton = (props: PrimaryButtonProps) => {
    return (
        <ClickableOpacityDiv id={props.id} disabled={props.disabled || !props.onClick} style={{
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
            marginTop: props.marginTop,
            background: (props.disabled || !props.onClick) ? AppColors.grey.neutral : props.backgroundColor ?? 'linear-gradient(135deg, #96EAF1 0%, #98E3F0 12%, #9FD1EC 30%, #A9B3E5 50%,#B889DD 73%, #CA54D2 97%, #FFB6E1 100%)',
            ...props.style
        }} onClick={() => {
            if (!props.disabled && props.onClick)
                props.onClick()
        }}>
            <Typography variant={!!props.smallText ? 'h4' : 'h3'} style={{ color: AppColors.white }}>
                {props.title}
            </Typography>
        </ClickableOpacityDiv>
    )
}

export default PrimaryButton