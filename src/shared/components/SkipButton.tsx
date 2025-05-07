import styled from '@emotion/styled';
import CloseIcon from '../../assets/icons/close_icon';
import CaretLeftIcon from '../../assets/icons/caret_left_icon';
import { Typography } from '@mui/material';
import ClickableOpacityDiv from './ClickableOpacityDiv';
import appTheme, { AppColors } from '../../theme/AppTheme';

const StyledButton = styled('div')(() => ({
    position: 'absolute',
    top: '22px',
    right: '22px',
    '&:hover': {
        cursor: 'pointer',
    }, zIndex: 99999999,
}));

interface SkipButtonProps {
    onClick: () => void;
}
const SkipButton = (props: SkipButtonProps) => {
    return (
        <StyledButton onClick={props.onClick}>
            <Typography variant="h4" color={AppColors.blue} component="div">
                Skip
            </Typography>
        </StyledButton>
    )
}

export default SkipButton