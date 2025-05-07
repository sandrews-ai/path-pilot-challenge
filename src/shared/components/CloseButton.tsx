import styled from '@emotion/styled';
import CloseIcon from '../../assets/icons/close_icon';
import CaretLeftIcon from '../../assets/icons/caret_left_icon';

const StyledButton = styled('div')((props: { left: boolean, lower: boolean }) => ({
    position: 'absolute',
    top: props.lower ? '42px' : '22px',
    right: props.left ? undefined : '22px',
    left: props.left ? '22px' : undefined,
    height: '21px',
    width: '21px',
    '&:hover': {
        cursor: 'pointer',
    }, zIndex: 99999999,
}));

interface CloseButtonProps {
    back?: boolean;
    onClick: () => void;
    lower?: boolean;
}
const CloseButton = (props: CloseButtonProps) => {
    return (
        <StyledButton lower={props.lower ?? false} left={props.back ?? false} onClick={props.onClick}>
            {props.back ? <CaretLeftIcon /> : <CloseIcon />}
        </StyledButton>
    )
}

export default CloseButton