import { Typography } from '@mui/material';
import { ReactNode } from 'react';
import AppLogoRoundedSmall from '../../assets/images/app_logo_rounded small';
import { useAppSelector } from '../../redux/hooks';
import ClickableOpacityDiv from '../../shared/components/ClickableOpacityDiv';
import APIJob from '../../shared/models/APIJob';
import Job from '../../shared/models/Job';
import { AppColors } from '../../theme/AppTheme';
import { marginForIndex, widthForIndex } from './MessageCell';

interface MobileJobCardCardProps {
    index: number;
    job: Job;
    jobData?: APIJob;
    minHeight?: string;
    onClick: () => void;
}
const MobileJobCard = (props: MobileJobCardCardProps) => {
    const { job, jobData, index, minHeight, onClick } = props;
    const isMobile = useAppSelector((s) => s.appState.isMobile);


    const JobInfoCell = (props: { children: ReactNode, cellIndex: number }) => {
        const { children, cellIndex } = props;
        return (<div style={{ height: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', minWidth: widthForIndex(cellIndex, isMobile), maxWidth: widthForIndex(cellIndex), marginLeft: marginForIndex(cellIndex) }} key={cellIndex}>
            {children}
        </div>);
    }

    return (
        <ClickableOpacityDiv onClick={onClick} key={index} style={{ minHeight: minHeight, height: '76px', maxHeight: '76px', overflow: 'hidden', display: 'flex', padding: '10px 15px', alignItems: 'center', backgroundColor: AppColors.white, boxShadow: `0 0 2px 1px ${AppColors.card}`, marginBottom: '16px', borderRadius: '12px', width: '100%', position: 'relative' }}>
            {jobData?.company_logo ? <JobInfoCell cellIndex={0} ><img src={jobData?.company_logo ?? ''} style={{ width: '34px', height: '34px', border: 'none', borderColor: 'transparent', borderRadius: '8px', objectFit: 'cover' }} /></JobInfoCell>
                : <JobInfoCell cellIndex={0}><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '34px', height: '34px' }}><AppLogoRoundedSmall /></div></JobInfoCell>
            }

            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: isMobile ? '10px' : '50px', width: '100%', overflow: 'hidden', }}>
                <Typography variant='body2' style={{ lineHeight: '19px', fontSize: '12px', whiteSpace: 'nowrap', maxWidth: 'calc(100%)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {job.title}<br />
                </Typography>
                <Typography variant='caption' style={{ lineHeight: '19px', color: AppColors.grey.darkish, whiteSpace: 'nowrap', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {job.company}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='caption' style={{ lineHeight: '19px', fontSize: '10px', whiteSpace: 'nowrap', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {job.location1}, {job.location2}
                    </Typography>
                </div>

            </div>
        </ClickableOpacityDiv>
    )
}

export default MobileJobCard