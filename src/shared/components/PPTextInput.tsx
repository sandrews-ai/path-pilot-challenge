import { Typography, useTheme } from '@mui/material';
import Input from '@mui/material/Input';
import { ReactNode } from 'react';
import { AppColors } from '../../theme/AppTheme';
import InputErrorText from './InputErrorText';



interface PPTextInputProps {
    id: string;
    title?: string;
    value?: string;
    error?: string;
    placeholder?: string;
    placeholderColor?: string;
    onValueChanged: (value: string) => void;
    onEnterPressed?: () => void;
    height?: string;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    borderColor?: string;
    fillColor?: string;
    onFocused?: () => void;
    onBlurred?: () => void;
    bottomPadding?: string;
    leadingPadding?: string;
    trailingPadding?: string;
    zIndex?: number;
    disabled?: boolean;
    reference?: any;
    textAlign?: 'left' | 'center' | 'right';
    autocomplete?: string;
    hidden?: boolean;
}

const PPTextInput = (props: PPTextInputProps) => {
    const theme = useTheme();
    const { id, title, value, error, hidden, placeholder, placeholderColor, fillColor, leadingIcon, trailingIcon, borderColor, bottomPadding, leadingPadding, zIndex, disabled, autocomplete, onValueChanged, onEnterPressed, onFocused, onBlurred, height, reference } = props;

    return (
        <div style={{ display: hidden ? 'none' : 'flex', flexDirection: 'column', width: '100%', paddingBottom: bottomPadding ?? '30px', zIndex: zIndex, }}>
            {!!title && <Typography variant='h4' style={{ textAlign: 'left', paddingBottom: '16px' }}>
                {title}
            </Typography>
            }
            <Input
                ref={reference}
                disableUnderline
                id={id}
                type={title ?? `${Math.random()}`}
                error={!!error}
                disabled={disabled}
                autoComplete={autocomplete ?? "off"}
                sx={{
                    backgroundColor: fillColor ?? AppColors.white,
                    borderRadius: '12px',
                    minHeight: height ?? '60px',
                    width: '100%',
                    paddingLeft: '6px',
                    border: `1.5px solid ${error ? AppColors.error : borderColor ?? AppColors.grey.border}`,
                    '& .MuiInputBase-input::placeholder': {
                        color: placeholderColor ?? AppColors.grey.darkish,
                        opacity: 1,
                        fontSize: '14px',
                        fontFamily: 'Inter',
                        fontWeight: 500,
                    },
                }}
                inputProps={{
                    style: {
                        paddingLeft: leadingPadding ?? '12px',
                        paddingRight: props.trailingPadding ?? '12px',
                        ...theme.typography.h5,
                        color: AppColors.black,
                        textAlign: props.textAlign ?? 'left',
                    }
                }}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onValueChanged(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        if (onEnterPressed)
                            onEnterPressed();
                    }
                }}
                startAdornment={leadingIcon}
                endAdornment={trailingIcon}
                onFocus={onFocused}
                onBlur={onBlurred}
            />
            {error && <InputErrorText variant='subtitle2'>{error}</InputErrorText>}
        </div>
    )
}

export default PPTextInput;