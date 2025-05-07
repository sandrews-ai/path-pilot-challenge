import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import ChatHistoryIcon from '../../assets/icons/chat_history_icon';
import SendImage from '../../assets/images/send.png';
import { useAppSelector } from '../../redux/hooks';
import ClickableOpacityDiv from '../../shared/components/ClickableOpacityDiv';
import { AppColors, BoxShadow } from '../../theme/AppTheme';

const TitleRow = styled(Box)((props: { isMobile: boolean }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: props.isMobile ? 'flex-start' : 'center',
    width: '100%',
}));

const PromptBox = styled(Box)((props: { isMobile: boolean }) => ({
    display: 'flex',
    flexDirection: 'row',
    marginTop: props.isMobile ? '15px' : 'clamp(15px, 31px, 31px)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    backgroundColor: AppColors.grey.lightest,
    width: props.isMobile ? '100%' : '260px',
    height: props.isMobile ? 'auto' : '80px',
}));

interface PromptCardProps {
    title: string;
    description: string;
    prompt: string;
    onClick: (prompt: string) => void;
}

const PromptCard = (props: PromptCardProps) => {
    const { title, prompt, description, onClick } = props;
    const [icon, setIcon] = useState(<ChatHistoryIcon color={AppColors.pink.dark} />);
    const isMobile = useAppSelector(state => state.appState.isMobile);
    return (
        <ClickableOpacityDiv
            gradientBorder={!isMobile}
            style={{
                position: 'relative',
                padding: isMobile ? '15px' : '20px',
                flexDirection: 'column',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                boxShadow: BoxShadow,
                borderRadius: '8px',
                marginBottom: '20px',
                marginRight: isMobile ? '35px' : '20px',
                marginLeft: isMobile ? '35px' : '20px',
                width: isMobile ? '100%' : '300px',
                height: isMobile ? 'auto' : '173px',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                backgroundColor: AppColors.white,
                transition: 'background-color 0.3s ease-in-out',

            }}
            onClick={() => onClick(prompt)}
            onMouseEnter={() => setIcon(<img src={SendImage} alt='send' style={{ width: '18px', height: '18px' }} />)}
            onMouseLeave={() => setIcon(<ChatHistoryIcon color={AppColors.pink.dark} />)}
        >
            <TitleRow isMobile={isMobile}>
                <div style={{ minWidth: isMobile ? '15px' : 0, maxWidth: isMobile ? undefined : 0 }} />
                {icon}
                <Typography variant='h1' sx={{ fontSize: isMobile ? '14px' : '20px', marginLeft: isMobile ? '12px' : '21px' }}>
                    {title}
                </Typography>
            </TitleRow>
            <PromptBox isMobile={isMobile}>
                <Typography variant='subtitle2' sx={{ textAlign: isMobile ? 'left' : 'center', height: '44px', color: AppColors.grey.dark, margin: '15px', marginBottom: isMobile ? '15px' : '20px' }}>
                    "{description}"
                </Typography>
            </PromptBox>
        </ClickableOpacityDiv>
    )
}

export default PromptCard