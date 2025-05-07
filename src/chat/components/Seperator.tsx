import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { AppColors } from "../../theme/AppTheme";

const StyledRow = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: '30px 0px',
}));

const Line = styled('div')(() => ({
    height: '1px',
    backgroundColor: AppColors.grey.border,
    flexGrow: 1,
}));

const Seperator = () => {
    return (
        <StyledRow>
            <Line />
            <Typography
                variant="h5"
                style={{
                    margin: '0px 20px',
                    color: AppColors.grey.darkish
                }
                }>
                OR
            </Typography>
            <Line />
        </StyledRow>
    )
}

export default Seperator