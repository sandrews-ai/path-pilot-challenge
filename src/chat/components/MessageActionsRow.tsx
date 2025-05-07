import styled from '@emotion/styled';
import { Check } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import CopyIcon from '../../assets/icons/copy_icon';
import { useAppSelector } from '../../redux/hooks';
import ClickableOpacityDiv from '../../shared/components/ClickableOpacityDiv';
import { AppColors } from '../../theme/AppTheme';

const StyledRow = styled('div')((props: { isMobile: boolean }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: '15px',
    marginLeft: props.isMobile ? '6px' : '96px',
}));

interface MessageActionsRowProps {
    isLastSentMessage: boolean;
    onCopy: () => void;
    onFeedback: () => void;
}

const MessageActionsRow = (props: MessageActionsRowProps) => {
    const { onCopy } = props;
    const [copyPressed, setCopyPressed] = useState(false);
    const isMobile = useAppSelector(state => state.appState.isMobile);

    const onCopyPressed = () => {
        setCopyPressed(true);
        setTimeout(() => {
            setCopyPressed(false);
        }, 2000);
        onCopy();
    }
    return (
        <StyledRow isMobile={isMobile}>
            <ActionButton isMobile={isMobile} icon={(isMobile && copyPressed) ? <div style={{ width: '17px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Check htmlColor={AppColors.pink.dark} /></div> : <CopyIcon />} title={copyPressed ? 'Copied!' : 'Copy'} onClick={onCopyPressed} />
            {/* <ActionButton isMobile={isMobile} icon={<DislikeIcon />} title={'Feedback'} onClick={onFeedback} /> */}
            {/* <ActionButton icon={<DeleteIcon />} title={'Delete'} onClick={onDelete} /> */}
        </StyledRow>
    )
}

interface ActionButtonProps {
    icon: ReactNode;
    title: string;
    onClick: () => void;
    isMobile: boolean;
}

const ActionButton = (props: ActionButtonProps) => {
    const { icon, title, onClick, isMobile } = props;
    return (<ClickableOpacityDiv onClick={onClick}
        style={{ marginRight: isMobile ? '20px' : 0 }}>
        {icon}
        {!isMobile && <Typography variant='subtitle1' style={{ marginLeft: '8px', marginRight: '40px', color: AppColors.grey.dark }}>
            {title}
        </Typography>}
    </ClickableOpacityDiv>);
}

export default MessageActionsRow