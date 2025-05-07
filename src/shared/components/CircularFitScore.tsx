
import { useTheme } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';
import './CircularFitScore.css';

interface CircularProgressProps {
    percentage: number;
    inputRadius?: number;
    inputStroke?: number;
}

const CircularFitScore = (props: CircularProgressProps) => {
    const { percentage, inputRadius, inputStroke } = props;
    const radius = inputRadius ?? 39; // Radius of the circle
    const stroke = inputStroke ?? 5; // Width of the progress ring
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = (circumference - (percentage / 100) * circumference) ?? 30;
    const isMobile = useAppSelector((s) => s.appState.isMobile);
    const theme = useTheme();

    return (
        <div className="circular-progress-container" style={{ display: 'inline', position: 'relative' }}>
            <svg
                height={radius * 2}
                width={radius * 2}
            >
                {/* Define the gradient */}
                <defs>
                    <linearGradient id="progressGradient" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#96EAF1" />
                        <stop offset="12%" stopColor="#98E3F0" />
                        <stop offset="30%" stopColor="#9FD1EC" />
                        <stop offset="50%" stopColor="#A9B3E5" />
                        <stop offset="73%" stopColor="#B889DD" />
                        <stop offset="97%" stopColor="#CA54D2" />
                    </linearGradient>
                </defs>

                {/* Background circle */}
                <circle
                    stroke="#e6e6e6"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />

                {/* Foreground circle */}
                <circle
                    stroke="url(#progressGradient)"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                >
                </circle>


            </svg>
            {/* Text */}
            <div
                style={{ height: radius * 2, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'absolute', top: `${(-normalizedRadius * 2) - 5}px`, bottom: 0, right: 0, left: 0, ...theme.typography.body2, fontSize: isMobile ? '10px' : '16px' }}

            >
                {percentage}%
            </div>
        </div>
    );
};

export default CircularFitScore;
