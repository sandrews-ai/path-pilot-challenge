import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MainChatPage from '../chat/pages/MainChatPage';
import { useAppSelector } from '../redux/hooks';
import zIndicies from '../shared/utils/zIndexConstants';
import { AppColors } from '../theme/AppTheme';

const kAppBarHeight = '60px';

export default function MobileNavigation() {
    const activeChat = useAppSelector(store => store.appState.activeChat);
    const fetchingChat = useAppSelector(store => store.appState.fetchingChat);
    const [title, setTitle] = useState(activeChat?.sessionTitle ?? '');
    const dispatch = useDispatch();

    useEffect(() => {
        setTitle(activeChat?.sessionTitle ?? '');
    }, [activeChat]);

    const showChatInfo = !!activeChat && !fetchingChat;
    return (
        <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <AppBar position="fixed" elevation={0} sx={{ zIndex: zIndicies.mobileAppBar, flexDirection: 'row', height: kAppBarHeight, borderBottom: `1px solid ${AppColors.grey.light}`, width: '100%' }}>
                <Toolbar disableGutters={true} sx={{ paddingLeft: '15px', paddingRight: '15px', width: 'calc(100% - 30px)', display: 'flex', flexDirection: 'row', zIndex: 2, justifyContent: 'space-between', }}>
                    <Typography variant="h4" style={{ whiteSpace: 'nowrap', textAlign: 'left', lineHeight: '14px', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '12px' }}>
                        {showChatInfo ? title : null}
                    </Typography>
                </Toolbar>
            </AppBar>
            <MainChatPage />
        </Box >
    );
}