import styled from "@emotion/styled";
import { TextareaAutosize, useTheme } from "@mui/material";
import { CSSProperties, useEffect, useRef } from "react";
import { useAppSelector } from "../../redux/hooks";
import { AppColors } from "../../theme/AppTheme";

const Input = styled(TextareaAutosize)((props: { style: CSSProperties }) => ({
    display: 'flex',
    flexGrow: 1,
    border: 'none',
    outline: 'none',
    padding: '4px',
    resize: 'none',
    '::placeholder': {
        color: AppColors.grey.dark,
    },
    ...props.style,
}));

interface PPTextInputProps {
    id: string;
    placeholder?: string;
    style?: CSSProperties;
    value: string;
    disabled?: boolean;
    onChange: (content: string) => void;
    onEnterPressed?: () => void;
    minRows?: number;
    maxRows?: number;
    autofocus?: boolean;
    backgroundColor?: string;
}

const PPMultiLineTextInput = (props: PPTextInputProps) => {
    const theme = useTheme();
    const { id, placeholder, style, value, onChange, onEnterPressed, disabled, minRows, maxRows, backgroundColor } = props;
    const focus = useAppSelector(state => state.appState.focusedTextToggle);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        focusInput();
    }, [focus]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && onEnterPressed && !event.shiftKey) {
            event.preventDefault();
            onEnterPressed();
        }
    };

    const focusInput = () => {
        if (props.autofocus && inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <Input
            ref={inputRef}
            autoComplete="off"
            id={id}
            style={{
                fontFamily: theme.typography.h5.fontFamily,
                fontSize: theme.typography.h5.fontSize,
                fontWeight: theme.typography.h5.fontWeight,
                backgroundColor: backgroundColor,
                ...style,
            }}
            readOnly={disabled}
            placeholder={placeholder}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            minRows={minRows}
            maxRows={maxRows ?? 4}
        />
    );
};

export default PPMultiLineTextInput;