import styled from "@emotion/styled";
import { Box } from "@mui/material";
import SendIcon from "../../assets/icons/send_icon";
import { AppColors } from "../../theme/AppTheme";

const Container = styled(Box)((props: { disabled?: boolean }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '34px',
    height: '34px',
    // marginLeft: 'auto',
    borderRadius: '8px',
    background: props.disabled ? AppColors.grey.neutral : 'linear-gradient(30deg, #96EAF1 0%, #98E3F0 12%, #9FD1EC 30%, #A9B3E5 50%,#B889DD 73%, #CA54D2 97%, #FFB6E1 100%)',
    transition: 'opacity 0.3s ease-in-out',
    '&:hover': {
        cursor: props.disabled ? 'default' : 'pointer',
        opacity: props.disabled ? 1.0 : 0.8,
    },
}));

interface SendButtonProps {
    disabled?: boolean;
}

const SendButton = (props: SendButtonProps) => {
    return (
        <Container disabled={props.disabled}>
            <SendIcon />
        </Container>
    )
}

export default SendButton
