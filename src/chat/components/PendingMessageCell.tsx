import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Bars } from 'react-loader-spinner';
import AppLogoRoundedSmall from '../../assets/images/app_logo_rounded small';
import { useAppSelector } from '../../redux/hooks';
import { AppColors } from '../../theme/AppTheme';
import ChatCell from './ChatCell';

const PendingMessageRow = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '24px',
}));

const PendingMessageCell = () => {
    const currentAction = useAppSelector(s => s.appState.currentChatAction);

    return (
        <ChatCell
            avatar={<AppLogoRoundedSmall />}
            isSent={false}
            time={''}
            pending={true}
            isNewest={true}
            content={
                <PendingMessageRow>
                    <Bars
                        height="30"
                        width="30"
                        color={AppColors.pink.dark}
                        ariaLabel="bars-loading"
                        visible={true}
                    />
                    {currentAction && <Typography variant="body1" sx={{ color: AppColors.grey.darkish }}>
                        {currentAction.charAt(0).toUpperCase() + currentAction.slice(1)}
                    </Typography>}
                </PendingMessageRow>
            }
        />
    )
}

export default PendingMessageCell