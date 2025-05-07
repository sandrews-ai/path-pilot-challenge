import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppLogoRounded from '../../assets/images/app_logo_rounded';
import { sendMessageAction } from '../../redux/actions/ChatActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { focusText } from '../../redux/reducers/appReducer';
import { AppDispatch } from '../../redux/store';
import ChatBar from '../components/ChatBar';
import ChatPage from './ChatPage';
import LoadingChatPage from './LoadingChatPage';


const Body = styled('div')((props: { isMobile: boolean }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    minHeight: props.isMobile ? '100%' : '100vh',
    overflowY: 'auto',
    flex: 1,
}));

interface WelcomeViewProps {
    t: TFunction<"translation", undefined>;
}
const WelcomeView = (props: WelcomeViewProps) => {
    const { t } = props;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(focusText());
    }, []);

    return (
        <Box sx={{ maxWidth: '1120px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'safe center', margin: 'auto' }}>
            <Box sx={{ marginTop: '28px' }}>
                <AppLogoRounded />
                <Typography variant='h2' sx={{ marginTop: '33px', marginBottom: '55px' }}>
                    {t('helpMessage')}
                </Typography>
            </Box>
            <div style={{ minHeight: '130px', maxHeight: '130px' }} />
        </Box>
    );
}

const messageSubmitted = (message: string, dispatch: AppDispatch) => {
    if (message.trim().length === 0) return;
    dispatch(sendMessageAction(message));
}

const MainChatPage = () => {
    const { t } = useTranslation();
    const activeChat = useAppSelector((s) => s.appState.activeChat);
    const fetchingChat = useAppSelector((s) => s.appState.fetchingChat);
    const isMobile = useAppSelector((s) => s.appState.isMobile);
    const dispatch = useAppDispatch();

    return (
        <Body isMobile={isMobile}>
            {!!fetchingChat ? <LoadingChatPage /> : (!!activeChat ? <ChatPage chat={activeChat} /> : <WelcomeView t={t} />)}
            <ChatBar
                onSubmit={(message: string) => messageSubmitted(message, dispatch)}
            />
        </Body>
    );
};

export default MainChatPage
