import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { ReactNode, useEffect, useRef, useState } from 'react';
import ExpandButton from '../../shared/components/ExpandButton';
import { AppColors } from '../../theme/AppTheme';

const StyledRow = styled('div')((props: { hideTopBorder: boolean, hideBottomBorder: boolean }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '25px',
    paddingBottom: '25px',
    borderBottom: props.hideBottomBorder ? undefined : `1px solid ${AppColors.separator}`,
    borderTop: props.hideTopBorder ? undefined : `1px solid ${AppColors.separator}`,
    width: '100%',
}));

const StyledColumn = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
}));

const ExpandedWrapper = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: '20px',
    overflowX: 'hidden',
}));

interface JobInfoRowProps {
    title: string;
    subtitle: ReactNode;
    iconButton?: ReactNode;
    hideTopBorder?: boolean;
    hideBottomBorder?: boolean;
    bigMargin?: boolean;
    expandable?: boolean;
    closedHeight?: number;
    alwaysExpanded?: boolean;
}

const JobInfoRow = (props: JobInfoRowProps) => {
    const { title, subtitle, iconButton, hideTopBorder, hideBottomBorder, bigMargin, expandable, closedHeight: inputClosedHeight, alwaysExpanded } = props;
    const closedHeight = inputClosedHeight ?? 280;

    const [isExpanded, setIsExpanded] = useState(false);
    const [hasExpandButton, setHasExpandButton] = useState(false);


    const summaryRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (expandable && summaryRef.current) {
            if (summaryRef.current.clientHeight + 30 > closedHeight) {
                setHasExpandButton(true);
            }
        }
    }, [subtitle, isExpanded]);


    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <StyledRow ref={summaryRef} hideTopBorder={hideTopBorder ?? false} hideBottomBorder={hideBottomBorder ?? false}>
            <StyledColumn>
                <Typography variant='body2'>
                    {title}
                </Typography>
                <Typography variant='h5' style={{
                    textAlign: 'left',
                    color: AppColors.grey.darkish,
                    marginTop: bigMargin ? '20px' : '6px',
                    maxHeight: (alwaysExpanded || isExpanded) ? 'none' : `${closedHeight}px`,
                    overflow: 'hidden',
                    width: '100%',
                }}>
                    {subtitle}
                </Typography>
                {hasExpandButton &&
                    <ExpandedWrapper>
                        <ExpandButton bottomMargin='0px' onClick={toggleExpand} isExpanded={alwaysExpanded || isExpanded} />
                    </ExpandedWrapper>
                }
            </StyledColumn>
            {iconButton}
        </StyledRow>
    )
}

export default JobInfoRow