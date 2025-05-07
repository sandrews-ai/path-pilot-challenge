import { Typography } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { AppColors } from "../../theme/AppTheme";
import ClickableOpacityDiv from "./ClickableOpacityDiv";

interface ExpandButtonProps {
    isExpanded: boolean;
    onClick: () => void;
    topMargin?: string;
    bottomMargin?: string;
}

const ExpandButton = (props: ExpandButtonProps) => {
    const { topMargin, bottomMargin, isExpanded, onClick } = props;
    const isMobile = useAppSelector(store => store.appState.isMobile);
    return (
        <ClickableOpacityDiv style={{ marginBottom: bottomMargin ?? '59px', marginTop: topMargin, textAlign: 'center' }} onClick={onClick}>
            <Typography variant='h5'
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: AppColors.pink.dark,
                    fontSize: isMobile ? '14px' : '16px',
                    lineHeight: isMobile ? '26px' : '24px',
                }}
            >
                {isExpanded ? '- Show less' : '+ Show more'}
            </Typography>
        </ClickableOpacityDiv>
    );
}

export default ExpandButton;