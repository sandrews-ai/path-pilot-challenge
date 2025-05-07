import { Typography } from '@mui/material';
import React from 'react';
import { AppColors } from '../../theme/AppTheme';
import ClickableOpacityDiv from './ClickableOpacityDiv';

const StyledPill = (selected: boolean): React.CSSProperties => {
    return {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 15px',
        borderRadius: '20px',
        backgroundColor: selected ? AppColors.black : AppColors.grey.lightest,
        color: selected ? AppColors.white : AppColors.grey.dark,
    }
};

interface SelectionPillProps {
    title: string;
    selected: boolean;
    onClick: () => void;
}

const SelectionPill = (props: SelectionPillProps) => {
    const { title, selected, onClick } = props;
    return (
        <ClickableOpacityDiv style={StyledPill(selected)} onClick={onClick}>
            <Typography variant='h3' style={{ fontWeight: 400 }}>
                {title}
            </Typography>
        </ClickableOpacityDiv>
    )
}

export default SelectionPill