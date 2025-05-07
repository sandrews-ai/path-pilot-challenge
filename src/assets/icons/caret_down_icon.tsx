interface CaretDownIconProps {
    color?: string;
}

const CaretDownIcon = (props: CaretDownIconProps) => {
    return (
        <svg width="15px" height="9px" viewBox="0 0 15 9" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Path-Pilot-App" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                <g id="PP---Desktop---Chat-Thread---Charts-and-Graphs---1920-Copy-15" transform="translate(-595, -401)" stroke={props.color ?? "#AAAAAA"} stroke-width="2">
                    <g id="Group-8" transform="translate(68, 44)">
                        <g id="Group-5" transform="translate(528, 358)">
                            <polyline id="Stroke-3" points="0 0 6.19131671 6.503862 12.3843428 0"></polyline>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}

export default CaretDownIcon;
