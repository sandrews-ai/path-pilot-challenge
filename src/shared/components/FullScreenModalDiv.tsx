import styled from "@emotion/styled";

const FullScreenModalDiv = styled('div')(() => ({
    width: '100vw',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'hidden',
    zIndex: 99999999,
}));

export default FullScreenModalDiv;