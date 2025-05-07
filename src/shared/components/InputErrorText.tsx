import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { AppColors } from "../../theme/AppTheme";

const InputErrorText = styled(Typography)(() => ({
    height: '15px',
    color: AppColors.error,
    marginLeft: '8px',
}));

export default InputErrorText;