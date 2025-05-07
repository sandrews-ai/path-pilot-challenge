interface IconProps {
    color: string;
}

const FAQIcon: React.FC<IconProps> = ({ color }) => {
    return (
        <svg width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>Group 7</title>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="PP---Desktop---Chat-History---1920" transform="translate(-42, -281)">
                    <g id="Group-7" transform="translate(43, 282)">
                        <path d="M8.3393,11.5885 C7.7843,11.5885 7.3353,12.0385 7.3353,12.5925 C7.3353,13.1475 7.7843,13.5965 8.3393,13.5965 C8.8933,13.5965 9.3433,13.1475 9.3433,12.5925 C9.3433,12.0385 8.8933,11.5885 8.3393,11.5885" id="Fill-1" fill={color}></path>
                        <path d="M16.679,8.34 C16.679,12.946 12.945,16.68 8.339,16.68 C3.733,16.68 0,12.946 0,8.34 C0,3.734 3.733,0 8.339,0 C12.945,0 16.679,3.734 16.679,8.34 Z" id="Stroke-3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M6.7253,5.0682 C7.1233,4.6282 7.6993,4.3512 8.3393,4.3512 C9.5403,4.3512 10.5153,5.3262 10.5153,6.5272 C10.5153,7.7292 9.5403,8.5902 8.3393,8.5902 L8.3393,9.7422" id="Stroke-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default FAQIcon;