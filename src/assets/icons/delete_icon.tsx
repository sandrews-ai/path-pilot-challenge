interface DeleteIconProps {
    color?: string;
}
const DeleteIcon = (props: DeleteIconProps) => {
    return (
        <svg width="19px" height="18px" viewBox="0 0 19 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="PathPilotApp" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="PPDesktopChatHistory1920" transform="translate(-1125, -966)" stroke={props.color ?? "#6C7275"} strokeWidth="2">
                    <g id="Group18" transform="translate(803, 961)">
                        <g id="Group10" transform="translate(323.934, 0)">
                            <g id="Group14" transform="translate(0, 6.066)">
                                <path d="M12.4220227,15.561712 L2.93159831,15.561712 C1.18336224,15.561712 -0.20809097,14.1722441 -0.20809097,12.5048825 L-0.20809097,3.2649205 C-0.20809097,1.56282224 1.21904052,0.20809097 2.93159831,0.20809097 L12.4220227,0.20809097 C14.1702588,0.20809097 15.561712,1.59755894 15.561712,3.2649205 L15.561712,12.5048825 C15.561712,14.1722441 14.1345805,15.561712 12.4220227,15.561712 Z" id="Path" transform="translate(7.6768, 7.8849) rotate(-270) translate(-7.6768, -7.8849)"></path>
                                <line x1="4.79190903" y1="11.208091" x2="10.791909" y2="5.20809097" id="Stroke1"></line>
                                <line x1="10.791909" y1="11.208091" x2="4.79190903" y2="5.20809097" id="Stroke3"></line>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default DeleteIcon;
