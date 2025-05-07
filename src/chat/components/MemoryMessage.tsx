import {
    Box,
    Tooltip,
    Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { AppColors } from "../../theme/AppTheme";

interface MemoryMessageProps {
    memories: string[];
}

// Styled Tooltip for customization
const CustomTooltip = styled(({ className, ...props }: any) => (
    <Tooltip {...props} placement="top" classes={{ popper: className }} />
))({
    [`& .MuiTooltip-tooltip`]: {
        backgroundColor: AppColors.grey.light,
        color: "black",
        maxWidth: 300,
        fontSize: "0.9em",
        padding: "16px",
        borderRadius: "8px",
    },
});

const MemoryMessage: React.FC<MemoryMessageProps> = ({ memories }) => {
    return (
        <CustomTooltip
            title={
                <Box>
                    {memories.length > 0 ? (
                        <Box sx={{ maxHeight: 50, overflowY: "auto" }}>
                            {memories.map((memory, index) => <Typography key={index} variant="body1">{memory}</Typography>)}
                        </Box>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No memories available.
                        </Typography>
                    )}
                </Box>
            }
            arrow
            placement="bottom-start"
            interactive
        >
            <Box
                sx={{
                    cursor: "pointer",
                    borderRadius: 1,
                    display: "inline-block",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{ fontStyle: "italic", color: AppColors.pink.dark }}
                >
                    Memory Saved
                </Typography>
            </Box>
        </CustomTooltip>
    );
};

export default MemoryMessage;