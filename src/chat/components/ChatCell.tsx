import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { AppColors, BoxShadow } from '../../theme/AppTheme';
import MemoryMessage from './MemoryMessage';
import SuggestionsContent from './SuggestionsContent';

const StyledFlexRow = styled.div<{ centered?: boolean }>(({ centered }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: !!centered ? 'center' : 'flex-start',
    justifyContent: 'flex-start',
    maxWidth: '100%',
}));

const ContentBox = styled(Box)((props: { isMobile: boolean }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: props.isMobile ? '17px' : '26px',
    maxWidth: props.isMobile ? 'calc(100% - 26px)' : 'calc(100% - 65px)',
    width: '100%'
}));

const MessageBox = styled(Box)((props: { rich?: boolean, isMobile: boolean, pending: boolean, resume: boolean, debug: boolean }) => ({
    borderRadius: '8px',
    overflow: 'hidden',
    padding: props.isMobile ? '15px' : '30px',
    marginTop: '20px',
    boxShadow: BoxShadow,
    textAlign: 'left',
    border: `1px solid ${AppColors.grey.light}`,
    maxWidth: props.pending ? undefined : (props.isMobile ? 'calc(100% - 30px)' : '100%'),
    width: props.rich ? '100%' : undefined,
    backgroundColor: !!props.debug ? AppColors.lightBlue : (props.rich ? AppColors.grey.lightest : AppColors.white),
}));

interface ChatCellProps {
    avatar: ReactNode;
    isSent: boolean;
    time: string;
    content: ReactNode;
    suggestions?: string[];
    urls?: string[];
    richContentMode?: boolean;
    resumeMode?: boolean;
    coverLetterMode?: boolean;
    pending?: boolean;
    isNewest: boolean;
    messageText?: ReactNode;
    resumeText?: string;
    documentName?: string;
    messageIndex?: number;
    mem?: string[];
    debug?: boolean;
}

export const ChatCell = (props: ChatCellProps) => {
    const { avatar, debug, isSent, time, content, suggestions, urls, richContentMode, resumeMode, coverLetterMode, mem, pending, isNewest, messageText, resumeText, documentName, messageIndex } = props;
    const isMobile = useAppSelector(state => state.appState.isMobile);
    const activeChat = useAppSelector(state => state.appState.activeChat);
    const isCurrentlyGenerating = (isNewest && (activeChat?.streaming || activeChat?.pending)) ?? false;
    if (isMobile) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
                <StyledFlexRow centered style={{ marginTop: '40px' }}>
                    <Box sx={{ height: '27px', width: '27px' }}>
                        {avatar}
                    </Box>
                    <ContentBox isMobile>
                        <StyledFlexRow centered>
                            <Typography variant='body1' style={{ marginRight: '10px' }}>
                                {isSent ? 'You' : 'Path Pilot'}
                            </Typography>
                            <Typography variant='caption' style={{ marginRight: '10px', color: AppColors.grey.darkish }}>
                                {time}
                            </Typography>
                        </StyledFlexRow>
                    </ContentBox>
                </StyledFlexRow>
                <MessageBox
                    pending={pending ?? false}
                    isMobile={isMobile}
                    resume={(resumeMode || coverLetterMode) ?? false}
                    debug={debug ?? false}
                    rich={richContentMode}>
                    {!!mem && mem.length > 0 && <Typography variant='h1'>MEMORY CREATED!</Typography>}
                    {content}
                    {!isSent && !!suggestions && suggestions.length > 0 && <SuggestionsContent suggestions={suggestions} />}
                </MessageBox>
            </div>
        );
    }

    return (
        <StyledFlexRow style={{ marginTop: isMobile ? '40px' : '64px', }}>
            <Box sx={{ height: '40px', width: '40px' }}>
                {avatar}
            </Box>
            <ContentBox isMobile={false}>
                <StyledFlexRow centered>
                    <Typography variant='body1' style={{ marginRight: '15px' }}>
                        {isSent ? 'You' : 'Path Pilot'}
                    </Typography>
                    <Typography variant='caption' style={{ marginRight: '15px', color: AppColors.grey.darkish }}>
                        {time}
                    </Typography>
                    {!!mem && mem.length > 0 && <MemoryMessage memories={mem} />}
                </StyledFlexRow>
                <MessageBox
                    pending={pending ?? false}
                    isMobile={isMobile}
                    rich={richContentMode}
                    resume={(resumeMode || coverLetterMode) ?? false}
                    debug={debug ?? false}
                >
                    {content}
                    {!isSent && !!suggestions && suggestions.length > 0 && <SuggestionsContent suggestions={suggestions} />}
                </MessageBox>
            </ContentBox>
        </StyledFlexRow>
    )
}


export default ChatCell