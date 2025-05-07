import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StopIcon from '../../assets/icons/stop_icon';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setUserStoppedStreaming } from '../../redux/reducers/appReducer';
import ClickableOpacityDiv from '../../shared/components/ClickableOpacityDiv';
import PPMultiLineTextInput from '../../shared/components/PPMultiLIneTextInput';
import zIndicies from '../../shared/utils/zIndexConstants';
import { AppColors, BoxShadow, sharpTransition } from '../../theme/AppTheme';
import SendButton from './SendButton';

interface ChatBarProps {
    onSubmit: (text: string) => void;
}

const Container = styled(Box)(() => ({
    position: 'fixed',
    bottom: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: zIndicies.chatBar,
    transition: `left 0.2s ${sharpTransition}`,
}));

const ChatRow = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: '20px',
    boxShadow: BoxShadow,
    marginLeft: '33px',
    marginRight: '33px',
    width: 'calc(100% - 46px)',
    marginBottom: '25px',
    paddingLeft: '0px',
    paddingRight: '20px',
    minHeight: '62px',
    maxWidth: '1160px',
    backgroundColor: AppColors.grey.lightest,
}));


const ChatBar = (props: ChatBarProps) => {
    const { t } = useTranslation();
    const isMobile = useAppSelector(store => store.appState.isMobile);
    const activeChat = useAppSelector(store => store.appState.activeChat);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useAppDispatch();



    const { onSubmit } = props;

    const onMessageSubmit = () => {
        if (!!(activeChat?.pending) || !!(activeChat?.streaming))
            return;
        onSubmit(inputValue);
        setInputValue('');
    }

    const onStopMessage = () => {
        dispatch(setUserStoppedStreaming(true));
    }

    const handleInputChange = (newValue: string) => {
        setInputValue(newValue);
    }

    let placeholder = t('messagePlaceholder');
    let isDisabled = !!(activeChat?.pending) || !!(activeChat?.streaming);
    const sendDisabled = inputValue.trim() === '';

    return (
        <Container sx={{ left: 0 }}>
            <ChatRow>
                <PPMultiLineTextInput
                    autofocus={!isMobile}
                    disabled={isDisabled}
                    id='message-input'
                    style={{ paddingLeft: '20px', paddingRight: '34px', marginTop: '15px', marginBottom: '15px', width: 'auto' }}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    onEnterPressed={onMessageSubmit}
                    backgroundColor={AppColors.grey.lightest}
                />
                {!!(activeChat?.streaming)
                    ? (<ClickableOpacityDiv onClick={onStopMessage}>
                        <StopIcon />
                    </ClickableOpacityDiv>)
                    : <div onClick={onMessageSubmit}>
                        <SendButton disabled={sendDisabled} />
                    </div>}
            </ChatRow>
        </Container >
    )
}

export default ChatBar