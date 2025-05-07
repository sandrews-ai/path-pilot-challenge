interface CloseIconProps {
    color?: string;
}

const CloseIcon = (props: CloseIconProps) => {
    return (
        <svg width="23px" height="23px" viewBox="0 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg" >
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-1240, -155)" stroke={props.color ?? "#141718"} strokeWidth="2">
                    <g id="Group-15" transform="translate(634, 142)">
                        <g id="Group-3" transform="translate(607, 14)">
                            <g id="Group-24" fill="#FFFFFF" fillRule="nonzero">
                                <g id="Group-12-Copy" transform="translate(-0.1151, 0.1108)">
                                    <g id="gradient-square-01" transform="translate(10.5, 10) rotate(-90) translate(-10.5, -10)translate(0.3892, -0.3849)">
                                        <path d="M16.3605697,20.495734 L3.8610957,20.495734 C1.55856101,20.495734 -0.274068635,18.6657191 -0.274068635,16.4697011 L-0.274068635,4.30010157 C-0.274068635,2.05833323 1.60555152,0.274068635 3.8610957,0.274068635 L16.3605697,0.274068635 C18.6631044,0.274068635 20.495734,2.1040836 20.495734,4.30010157 L20.495734,16.4697011 C20.495734,18.6657191 18.6161139,20.495734 16.3605697,20.495734 Z" id="Path" transform="translate(10.1108, 10.3849) rotate(-270) translate(-10.1108, -10.3849)"></path>
                                    </g>
                                </g>
                            </g>
                            <g id="Group-4" transform="translate(8, 7)" strokeLinecap="round" strokeLinejoin="round">
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

export default CloseIcon;
