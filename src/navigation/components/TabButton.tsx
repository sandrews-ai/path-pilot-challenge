import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ReactNode } from 'react';
import { AppColors } from '../../theme/AppTheme';
import AppTypography from '../../theme/AppTypography';
import { Padding } from '@mui/icons-material';
import { useAppSelector } from '../../redux/hooks';

interface TabButtonProps {
    text: string;
    icon: ReactNode;
    fullWidth: boolean;
    isSelected: boolean;
    onClick: () => void;
}

const TabButton = (props: TabButtonProps) => {
    const { text, fullWidth, isSelected, icon, onClick } = props;
    const isMobile = useAppSelector(store => store.appState.isMobile);
    // Define the styles for the ListItemButton based on the fullWidth prop
    const listItemButtonStyles = {
        minHeight: 48,
        marginLeft: fullWidth ? '20px' : '7px',
        marginRight: fullWidth ? '24px' : '7px',
        justifyContent: 'flex-start',
        borderRadius: '8px',
        backgroundColor: isSelected ? AppColors.white : undefined,
        // px: fullWidth ? '20px' : 'auto',
        // Apply transitions based on the fullWidth prop
        transition: 'background-color 0.3s ease-in-out, padding 0.3s ease-in-out, margin 0.3s ease-in-out',
        paddingTop: isMobile ? 0 : undefined,
        paddingLeft: isMobile ? '5px' : undefined,
    };

    return (
        <ListItem title={text} key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                title={text}
                sx={listItemButtonStyles} // Apply the styles here
                onClick={onClick}
            >
                <ListItemIcon
                    title={text}
                    sx={{
                        minWidth: 0,
                        maxWidth: '18px',
                        marginRight: fullWidth ? '17px' : '0px',
                        justifyContent: 'center',
                        transition: 'margin 0.3s ease-in-out'
                    }}
                >
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={text}
                    primaryTypographyProps={isSelected ? AppTypography.tabItemSelected : AppTypography.tabItemUnselected}
                    sx={{ opacity: fullWidth ? 1 : 0, transition: 'opacity 0.3s ease-in-out' }}
                />
            </ListItemButton>
        </ListItem>
    );
};

export default TabButton;
