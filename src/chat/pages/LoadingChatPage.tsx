import styled from '@emotion/styled';
import { Bars } from 'react-loader-spinner';
import { AppColors } from '../../theme/AppTheme';


const DaddyBox = styled('div')(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));




const LoadingChatPage = () => {
    return (
        <DaddyBox>
            <Bars
                height="30"
                width="30"
                color={AppColors.pink.dark}
                ariaLabel="bars-loading"
                visible={true}
            />
        </DaddyBox >
    )
}

export default LoadingChatPage