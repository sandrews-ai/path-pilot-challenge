import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import BrandLogo from '../../assets/images/path_pilot_logo';
import TextLogo from '../../assets/images/text_logo';
import NavigationConstants from '../NavigationConstants';
import { useAppSelector } from '../../redux/hooks';

const LogoRow = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    '&:hover': {
        cursor: 'pointer',
    },
}));

interface LogoProps {
    open: boolean;
    onClick: () => void;
}

const FullLogo = (props: LogoProps) => {
    const { open, onClick } = props;
    const isMobile = useAppSelector(store => store.appState.isMobile);
    return (
        <LogoRow onClick={onClick} sx={{ paddingLeft: open ? (isMobile ? '25px' : '35px') : NavigationConstants.logoLeadingPaddingClosed(), justifyContent: 'center', transition: 'padding 0.3s ease-in-out' }}>
            <BrandLogo />
            <Box sx={{ paddingLeft: '11px', opacity: open ? 1 : 0, width: open ? undefined : '0px', transition: 'opacity 0.3s ease-in-out, width 0.3s ease-in-out' }}>
                <TextLogo />
            </Box>
        </LogoRow>
    );
}

export default FullLogo