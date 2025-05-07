
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import { AppColors } from '../../theme/AppTheme';
import './CircularFitScore.css';

const StyledColumn = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    marginBottom: '9px',
}));

interface LinearFitScoreProps {
    percentage: number;
}

const LinearFitScore = (props: LinearFitScoreProps) => {
    const { percentage } = props;
    const isMobile = useAppSelector((s) => s.appState.isMobile);
    const fullWidth = isMobile ? 36 : 86;
    const barWidth = percentage / 100.0 * fullWidth;

    return (
        <StyledColumn>
            <Typography variant='body2' style={{ fontSize: isMobile ? '12px' : undefined, marginBottom: isMobile ? '5px' : '11px' }}>
                {percentage}%
            </Typography>
            <div className="linear-progress-container" style={{ display: 'inline', position: 'relative', width: `${fullWidth}px`, height: '8px' }}>
                <div className="linear-progress-bar" style={{ height: '8px', width: `${fullWidth}px`, borderRadius: '5px', backgroundColor: AppColors.grey.lightish, overflow: 'hidden' }}>
                    <div className="linear-progress-fill" style={{ borderRadius: '5px', height: '8px', width: barWidth + 'px', background: 'linear-gradient(90deg, #96EAF1 0%, #98E3F0 12%, #9FD1EC 30%, #A9B3E5 50%,#B889DD 73%, #CA54D2 97%, #FFB6E1 100%)' }}></div>
                </div>
            </div>
        </StyledColumn>
    );
};

export default LinearFitScore;
