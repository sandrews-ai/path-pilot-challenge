import { ListItemIcon, Typography } from '@mui/material';
import { ReactNode } from 'react';
import ClickableOpacityDiv from '../../shared/components/ClickableOpacityDiv';
import { AppColors, sharpTransition } from '../../theme/AppTheme';

interface TabActionButtonProps {
    text: string;
    icon: ReactNode;
    fullWidth: boolean;
    onClick: () => void;
}

const TabActionButton = (props: TabActionButtonProps) => {
    const { text, fullWidth, icon, onClick } = props;


    return (
        <ClickableOpacityDiv
            key={text}
            onClick={onClick}
            style={{
                display: 'flex', justifyContent: 'center',
                marginLeft: fullWidth ? '24px' : '21px',
                marginRight: fullWidth ? '24px' : '21px',
                width: fullWidth ? '203px' : '22px',
                borderRadius: fullWidth ? '12px' : '3px',
                height: fullWidth ? '34px' : '22px',
                overflow: 'hidden',
                transition: `all 0.2s ${sharpTransition}`,
                marginTop: '26px',
                backgroundColor: AppColors.black,
            }}>

            <ListItemIcon
                sx={{
                    minWidth: '10px',
                    maxWidth: '10px',
                    marginRight: fullWidth ? '10px' : '0px',
                    justifyContent: 'center',
                    transition: 'margin 0.3s ease-in-out'
                }}
            >
                {icon}
            </ListItemIcon>
            <Typography variant='body1' style={{ width: fullWidth ? '66.2px' : '0px', color: AppColors.white, opacity: fullWidth ? 1 : 0, transition: 'opacity 0.3s ease-in-out, width 0.3s ease-in-out' }}>
                {text}
            </Typography>

        </ClickableOpacityDiv>
    );
};

export default TabActionButton;
