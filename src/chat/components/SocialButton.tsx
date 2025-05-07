import { Typography } from '@mui/material';
import ClickableDiv from '../../shared/components/ClickableDiv';
import { AppColors } from '../../theme/AppTheme';

interface SocialButtonProps {
    title: string;
    icon: string;
    onClick: () => void;
}

const SocialButton = (props: SocialButtonProps) => {
    const { onClick, title, icon } = props;
    return (
        <ClickableDiv
            inactiveColor={AppColors.white}
            pressedColor={AppColors.grey.light}
            hoverColor={AppColors.grey.lightest}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                border: `1px solid ${AppColors.grey.border}`,
                minHeight: '60px',
                width: '100%',
            }}
            onClick={onClick}
        >
            <img src={icon} width={'29px'} height={'29px'} alt="social icon" />
            <Typography variant='h5' style={{ marginLeft: '9px', color: AppColors.grey.darkish }}>
                {title}
            </Typography>

        </ClickableDiv>
    )
}

export default SocialButton