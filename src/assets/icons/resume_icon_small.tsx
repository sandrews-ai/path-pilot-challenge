interface IconProps {
    color: string;
}
const ResumeIconSmall = (props: IconProps) => {
    return (
        <svg width="21px" height="20px" viewBox="0 0 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>Saved Resumes</title>
            <g id="Path-Pilot-App" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                <g id="Group-75" transform="translate(1, 1.5)" stroke={props.color ?? "#6C7275"} stroke-width="2">
                    <line x1="13" y1="12.5" x2="19" y2="12.5" id="Stroke-5-Copy-2"></line>
                    <line x1="13" y1="6.5" x2="19" y2="6.5" id="Stroke-5-Copy-4"></line>
                    <line x1="-4.32009983e-12" y1="17.5" x2="19" y2="17.5" id="Stroke-5-Copy-3"></line>
                    <line x1="13" y1="0.5" x2="19" y2="0.5" id="Stroke-9-Copy"></line>
                    <path d="M7.75862069,3.01692118 C7.75862069,4.6832402 6.40752152,6.03448276 4.74137931,6.03448276 C3.07459677,6.03448276 1.72413793,4.6832402 1.72413793,3.01692118 C1.72413793,1.35060216 3.07459677,0 4.74137931,0 C6.40752152,0 7.75862069,1.35060216 7.75862069,3.01692118 Z" id="Stroke-1"></path>
                    <path d="M4.74137931,6.46551724 C1.08094748,6.46551724 0,9.70489956 0,12.5 L9.48275862,12.5 C9.48275862,9.70489956 8.4012674,6.46551724 4.74137931,6.46551724 Z" id="Stroke-3"></path>
                </g>
            </g>
        </svg>
    );
}

export default ResumeIconSmall;
