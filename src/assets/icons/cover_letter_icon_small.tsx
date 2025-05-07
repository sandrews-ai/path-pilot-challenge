interface IconProps {
    color: string;
}
const CoverLetterIconSmall = (props: IconProps) => {
    return (
        <svg width="19px" height="21px" viewBox="0 0 19 21" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>Saved Cover Letters</title>
            <g id="Path-Pilot-App" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="Group-62" transform="translate(1, 1)" stroke={props.color ?? "#6C7275"} strokeWidth="2">
                    <g id="Group-5">
                        <path d="M14.5278348,19 L2.47216519,19 C1.10693964,19 0,17.9487467 0,16.6516201 L0,2.34837987 C0,1.05125331 1.10693964,0 2.47216519,0 L9.13275063,0 C9.69419839,0 10.238693,0.18198492 10.6774799,0.514978602 L16.0725641,4.61544732 C16.6589429,5.06072957 17,5.73542898 17,6.44884858 L17,16.6516201 C17,17.9487467 15.8930604,19 14.5278348,19 Z" id="Stroke-1"></path>
                        <path d="M9.99990028,1.0002904 L9.99990028,5.1108823 C9.99990028,6.15449601 10.7895344,7.0002904 11.7634165,7.0002904 L16.9999003,7.0002904" id="Stroke-3"></path>
                    </g>
                    <line x1="4" y1="15" x2="13" y2="15" id="Stroke-5"></line>
                    <line x1="4" y1="9.5" x2="9" y2="9.5" id="Stroke-7"></line>
                    <line x1="4" y1="4" x2="6" y2="4" id="Stroke-9"></line>
                </g>
            </g>
        </svg>
    );
}

export default CoverLetterIconSmall;
