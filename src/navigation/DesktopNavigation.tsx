import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MainChatPage from '../chat/pages/MainChatPage';
import { sharpTransition } from '../theme/AppTheme';

const MainContentView = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    transition: `margin-left 0.2s ${sharpTransition}, width 0.2s ${sharpTransition}`,
}));

const DesktopNavigation = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <CssBaseline />
            <MainContentView sx={{
                height: '100vh',
                width: `100%`
            }}>
                <MainChatPage />
            </MainContentView>

        </Box>
    );
}

export default DesktopNavigation;
