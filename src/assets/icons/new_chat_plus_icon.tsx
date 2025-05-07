interface Props {
    color?: string;
}
const NewChatPlusIcon = (props: Props) => {
    return (
        <svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" >
            <g id="PathPilotApp" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="PPDesktopChatThreadJobBoard1920Copy6" transform="translate(-81, -401)" stroke={props.color ?? "#FFFFFF"} strokeWidth="2">
                    <g id="Group3Copy3" transform="translate(21, 390)">
                        <g id="Group10" transform="translate(61, 8)">
                            <g id="Group6" transform="translate(0, 4)">
                                <line x1="0" y1="5" x2="10" y2="5" id="Stroke1"></line>
                                <line x1="5" y1="0" x2="5" y2="10" id="Stroke3"></line>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default NewChatPlusIcon;
