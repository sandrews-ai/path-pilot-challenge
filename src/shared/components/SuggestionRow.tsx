import { Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import ChatHistoryIcon from '../../assets/icons/chat_history_icon';
import SendImage from '../../assets/images/send.png';
import { AppColors, BoxShadow } from '../../theme/AppTheme';
import ClickableOpacityDiv from './ClickableOpacityDiv';
import App from '../../App';

interface SuggestionRowProps {
    title: ReactNode;
    onClick: () => void;
    invertColors?: boolean;
}
const SuggestionRow = (props: SuggestionRowProps) => {
    const { title, onClick, invertColors } = props;
    const [icon, setIcon] = useState(<ChatHistoryIcon color={AppColors.grey.dark} />);
    const [hovered, setHovered] = useState(false);

    return (
        <ClickableOpacityDiv
            onMouseEnter={() => {
                setIcon(<img src={SendImage} alt='send' style={{ width: '22px', height: '22px' }} />)
                setHovered(true);
            }}
            onMouseLeave={() => {
                setIcon(<ChatHistoryIcon color={AppColors.grey.dark} />);
                setHovered(false);
            }}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: '9px',
                paddingBottom: '9px',
                paddingRight: '15px',
                paddingLeft: '15px',
                gap: '18px',
                borderRadius: '12px',
                boxShadow: hovered ? BoxShadow : undefined,
                backgroundColor: invertColors ? AppColors.white : AppColors.grey.lightest,
            }}
            onClick={onClick}
        >
            <div style={{
                minWidth: '22px',
                height: '22px',
            }}>
                {icon}
            </div>
            <Typography variant='h5' style={{ color: AppColors.black }}>
                {title}
            </Typography>
        </ClickableOpacityDiv>
    );
}

export default SuggestionRow;