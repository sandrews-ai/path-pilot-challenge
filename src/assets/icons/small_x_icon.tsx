interface Props {
    color?: string;
}

const SmallXIcon = (props: Props) => {
    return (
        <svg width="8px" height="8px" viewBox="0 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" >
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <g id="PP---Desktop---Landing---1024-Copy-7" transform="translate(-689, -467)" stroke={props.color ?? "#999DA0"} strokeWidth="2">
                    <g id="Group-15" transform="translate(396, 70)">
                        <g id="Group-22" transform="translate(294, 388)">
                            <g id="Group-14" transform="translate(0, 10)">
                                <line x1="0" y1="6" x2="6" y2="0" id="Stroke-1"></line>
                                <line x1="6" y1="6" x2="0" y2="0" id="Stroke-3"></line>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default SmallXIcon;
