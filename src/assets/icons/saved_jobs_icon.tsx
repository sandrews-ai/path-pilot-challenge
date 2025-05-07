interface IconProps {
    color: string;
}

const SavedJobsIcon: React.FC<IconProps> = ({ color }) => {
    return (
        <svg width="20px" height="18px" viewBox="0 0 20 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="PP---Desktop---Chat-History---1920" transform="translate(-42, -185)" stroke={color} strokeWidth="2">
                    <g id="Group-7" transform="translate(43, 186)">
                        <path d="M17.059,5.0562 C17.059,4.0132 16.265,3.1602 15.294,3.1602 L1.765,3.1602 C0.794,3.1602 0,4.0132 0,5.0562 L0,13.9052 C0,14.9472 0.794,15.8012 1.765,15.8012 L15.294,15.8012 C16.265,15.8012 17.059,14.9472 17.059,13.9052 L17.059,5.0562 Z" id="Stroke-1"></path>
                        <path d="M5.8825,3.16 L5.8825,1.58 C5.8825,0.711 6.5445,-8.8817842e-16 7.3535,-8.8817842e-16 L9.7065,-8.8817842e-16 C10.5145,-8.8817842e-16 11.1765,0.711 11.1765,1.58 L11.1765,3.16" id="Stroke-3"></path>
                        <line x1="0.5787" y1="8.4723" x2="16.2177" y2="8.4723" id="Stroke-5"></line>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default SavedJobsIcon;
