import styled from '@emotion/styled';
import { ArrowDownward } from '@mui/icons-material';
import { Box, Button, FormControlLabel, Switch, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import NavigationConstants from '../../navigation/NavigationConstants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearActiveChat, setDebugMode } from '../../redux/reducers/appReducer';
import Chat from '../../shared/models/Chat';
import Message, { isLastMessageFromUser, MessageType } from '../../shared/models/Message';
import { isIOS } from '../../shared/utils/PlatformUtils';
import zIndicies from '../../shared/utils/zIndexConstants';
import { AppColors } from '../../theme/AppTheme';
import MessageActionsRow from '../components/MessageActionsRow';
import MessageCell from '../components/MessageCell';
import PendingMessageCell from '../components/PendingMessageCell';


const DaddyBox = styled('div')(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
}));


const StyledBox = styled('div')(() => ({
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexShrink: 1,
    flexGrow: 1,
    minHeight: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    maxWidth: `100%`,

}));

const StyledColumn = styled('div')((props: { fullSize: boolean }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 'calc(100%)',
    marginRight: '64px',
    transition: 'all 0.3s ease-in-out',
}));


const StyledRow = styled('div')((props: { fullSize: boolean }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: '60px',
    paddingLeft: '60px',
    paddingTop: props.fullSize ? '55px' : '32px',
    paddingBottom: props.fullSize ? '20px' : '20px',
    width: '100%',
    transition: 'all 0.3s ease-in-out',
    zIndex: zIndicies.desktopChatTitleRow,
    backgroundColor: AppColors.white,
}));

const StyledRowContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: `${NavigationConstants.maxChatWidth}px`,
    transition: 'all 0.3s ease-in-out',
}));

const StyledRowBottomBorder = styled('div')((props: { visible: boolean }) => ({
    width: '100%',
    height: '1px',
    backgroundColor: AppColors.grey.light,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    opacity: props.visible ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
}));


interface ChatPageProps {
    chat: Chat;
}

const ChatPage = (props: ChatPageProps) => {
    const { chat } = props;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [follow, setFollow] = useState(false);
    const [title, setTitle] = useState(chat.sessionTitle ?? '');
    const isMobile = useAppSelector(store => store.appState.isMobile);
    const [topBarFull, setTopBarFull] = useState(true);
    const [messageCount, setMessageCount] = useState(0);
    const activeChat = useAppSelector(store => store.appState?.activeChat);
    const followChatToggle = useAppSelector(store => store.appState.followChatToggle);
    const messageCellRef = useRef<HTMLDivElement | null>(null);
    const debugMode = useAppSelector(store => store.appState.debugMode);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTitle(activeChat?.sessionTitle ?? '')
    }, [activeChat]);

    useEffect(() => {
        if (containerRef.current) {
            if (!isMobile) {
                setFollow(true);
            }
            if (activeChat?.messages.length === 1) return;
            if (isIOS()) {
                bottomRef.current?.scrollIntoView({ behavior: 'auto' });
            } else {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        }
    }, [followChatToggle]);

    useEffect(() => {
        if (!isMobile) return;
        if (!follow) {

        }
    }, [follow, isMobile]);

    useEffect(() => {
        const handleScroll = () => {
            const isIos = isIOS();
            if (containerRef.current) {
                const scrollTop = isIos
                    ? -(document.getElementById('innerContainer')?.getBoundingClientRect().top ?? 0)
                    : containerRef.current.scrollTop;
                const scrollHeight = containerRef.current.scrollHeight;
                const clientHeight = isIos ? window.innerHeight : containerRef.current.clientHeight;
                const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
                if (!isMobile && !follow && distanceFromBottom < 20) {
                    setFollow(true);
                } else if (follow && distanceFromBottom > 20) {
                    setFollow(false);
                }

                // Handle top bar grow/shrink
                if (!topBarFull && scrollTop < 100) {
                    setTopBarFull(true);
                } else if (topBarFull && scrollTop >= 100) {
                    setTopBarFull(false);
                }
            }
        };

        if (containerRef.current) {
            containerRef.current.addEventListener(isMobile ? 'touchmove' : 'scroll', handleScroll);
        }

        if (containerRef.current) {
            containerRef.current.classList.add('scroll-animation');
            if (follow || (activeChat && isLastMessageFromUser(activeChat.messages))) {
                if (activeChat?.messages.length === 1) return;
                if (isIOS()) {
                    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
                } else {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
            }

            setTimeout(() => {
                if (containerRef.current) {
                    containerRef.current.classList.remove('scroll-animation');
                }
            }, 300);
        }
        if (chat.messages.length > messageCount && chat.messages[chat.messages.length - 1].type === MessageType.sent) {
            setFollow(false);
        }
        setMessageCount(chat.messages.length);

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener(isMobile ? 'touchmove' : 'scroll', handleScroll);
            }
        };
    }, [chat.messages, chat.suggestions, follow, topBarFull]);

    const onCopy = (message: Message) => {
        navigator.clipboard.writeText(message.content);
    }
    const onFeedback = (message: Message) => {
        console.log(`User no likey this message`);
    }

    const startedDateString = () => {
        const createdDate = moment(chat.created);
        const today = moment().startOf('day');

        if (createdDate.isSame(today, 'day')) {
            return 'Today';
        } else {
            return createdDate.format('MMM DD, YYYY');
        }
    }

    var lastSentMessage: Message | undefined = undefined;

    return (
        <DaddyBox>
            {!isMobile &&
                <StyledRow fullSize={topBarFull}>
                    <StyledRowContent>
                        <StyledColumn fullSize={topBarFull}>
                            <span style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                fontSize: topBarFull ? '18px' : '14px',
                                transition: 'all 0.3s ease-in-out',
                                marginBottom: topBarFull ? '12px' : '0px',
                                maxHeight: '24px',
                                willChange: 'font-size',
                                fontFamily: 'Poppins',
                                fontWeight: 600,
                            }}>
                                {title}
                            </span>
                            <Typography variant='caption' style={{ opacity: topBarFull ? 1 : 0, maxHeight: topBarFull ? '19px' : 0, whiteSpace: 'noWrap', transition: 'all 0.3s ease-in-out' }} >
                                {`Started ${startedDateString()} @ ${new Date(chat.created).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`}
                            </Typography>
                        </StyledColumn>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            width: '100%'
                        }}>
                            <Box sx={{ zIndex: 1 }}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={debugMode}
                                            onChange={(e) => dispatch(setDebugMode(e.target.checked))}
                                            name="debugToggle"
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                    backgroundColor: AppColors.pink.dark,
                                                },
                                            }}
                                        />
                                    }
                                    label="Show Function Calls"
                                />
                            </Box>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    dispatch(clearActiveChat());
                                }}
                                sx={{ ml: 2, color: '#000', border: `1px solid ${AppColors.grey.darkish}`, width: '130px' }}
                            >
                                New Chat
                            </Button>
                        </div>
                    </StyledRowContent>
                    <StyledRowBottomBorder visible={!topBarFull} />
                </StyledRow>}
            <StyledBox>
                <div
                    ref={containerRef}
                    className={'chat-scroll-page'}
                    style={{
                        height: isMobile ? 'calc(100% - 130px)' : 'calc(100vh - 130px)',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        padding: '0px 0px 50px 0px',
                        width: '100%',
                        maxWidth: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        WebkitOverflowScrolling: 'touch',
                        paddingBottom: '150px',
                    }}
                >
                    <div id="innerContainer"
                        style={{
                            paddingRight: isMobile ? '20px' : '60px',
                            paddingLeft: isMobile ? '20px' : '60px',
                            marginTop: isMobile ? 0 : '48px',
                            width: isMobile ? 'calc(100% - 40px)' : 'calc(100%)',
                            maxWidth: `calc(${NavigationConstants.maxChatWidth}px + 120px)`,
                        }}>

                        {chat.messages.map((message, index) => {
                            try {
                                const isLastReceived = index === (chat.messages.length - 1) && message.type === MessageType.received;
                                // Handle normal messages
                                if ((message.type === MessageType.received || message.type === MessageType.sent) && (message.content !== undefined && message.content.length > 0)) {
                                    // Check if this message has a named document attached
                                    const documentName = chat.data?.documentNames?.find(d => d.messageIndex === message.i)?.name;
                                    const hideDoc = lastSentMessage?.meta?.hideDoc ?? false;
                                    const unviewedJobs = chat.messages[0].meta?.unviewedJobs ?? true;
                                    return (<>
                                        <MessageCell
                                            reference={(message.i === chat.scrollToIndex) ? messageCellRef : undefined}
                                            key={index}
                                            message={message}
                                            suggestions={(isLastReceived) ? chat.suggestions : undefined}
                                            isNewest={isLastReceived}
                                            documentName={documentName}
                                            hideDoc={hideDoc}
                                            unviewedJobs={unviewedJobs}
                                            streaming={chat.streaming}
                                        />
                                        {message.type === MessageType.received && !((chat.pending || chat.streaming) && isLastReceived) &&
                                            <MessageActionsRow
                                                onCopy={() => onCopy(message)}
                                                onFeedback={() => onFeedback(message)}
                                                isLastSentMessage={isLastReceived}
                                            />
                                        }
                                    </>);
                                } else if (message.type === MessageType.fnReturn) {
                                    if (!debugMode) return null;
                                    return <MessageCell
                                        reference={undefined}
                                        key={index}
                                        message={message}
                                        suggestions={undefined}
                                        isNewest={isLastReceived}
                                        documentName={''}
                                        debug={true}
                                        streaming={chat.streaming}
                                    />;
                                } else if (message.type === MessageType.fnCall) {
                                    if (!debugMode) return null;
                                    return <MessageCell
                                        reference={undefined}
                                        key={index}
                                        message={{ ...message, content: JSON.stringify(message) }}
                                        suggestions={undefined}
                                        isNewest={isLastReceived}
                                        documentName={''}
                                        debug={true}
                                        streaming={chat.streaming}
                                    />;
                                }
                                return null;
                            }
                            catch (e) {
                                console.log(e);
                                return null;
                            } finally {
                                if (message.type === MessageType.sent) {
                                    lastSentMessage = message;
                                }
                            }
                        })}
                        {chat.pending && <PendingMessageCell />}
                        <div ref={bottomRef} style={{ minHeight: '1px' }}></div>
                    </div>
                </div>
                {isMobile && !follow && <div
                    onClick={() => setFollow(true)}
                    style={{
                        height: '35px',
                        width: '35px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: '95px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 900,
                        border: `1px solid ${AppColors.grey.darkish}`,
                        borderRadius: '50%',
                        backgroundColor: AppColors.white,
                        boxShadow: `0px 0px 5px ${AppColors.grey.light}`,
                    }}>
                    <ArrowDownward sx={{ width: '20px', height: '20px', color: AppColors.grey.darkish }} />
                </div>}
            </StyledBox>
        </DaddyBox >
    )
}

export default ChatPage;