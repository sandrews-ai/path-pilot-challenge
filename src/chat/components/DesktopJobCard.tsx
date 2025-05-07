import { Typography } from '@mui/material';
import { ReactNode } from 'react';
import AppLogoRoundedSmall from '../../assets/images/app_logo_rounded small';
import ClickableOpacityDiv from '../../shared/components/ClickableOpacityDiv';
import APIJob from '../../shared/models/APIJob';
import Job from '../../shared/models/Job';
import { AppColors } from '../../theme/AppTheme';
import { marginForIndex, widthForIndex } from './MessageCell';

interface DesktopJobCardProps {
    index: number;
    job: Job;
    jobData?: APIJob;
    minHeight?: string;
    onBookmarked?: () => void;
    onClick: () => void;
}
const DesktopJobCard = (props: DesktopJobCardProps) => {
    const { job, jobData, index, minHeight, onClick, onBookmarked } = props;

    const JobInfoCell = (props: { children: ReactNode, cellIndex: number }) => {
        const { children, cellIndex } = props;
        return (<div style={{ textAlign: 'left', minWidth: widthForIndex(cellIndex), maxWidth: widthForIndex(cellIndex), marginLeft: marginForIndex(cellIndex) }} key={cellIndex}>
            {children}
        </div>);
    }

    const jobLocations = jobData?.location?.split(', ') ?? ['n/a'];
    const location1 = jobLocations ? (jobLocations.length > 0 ? jobLocations[0] : job.location1) : job.location1;
    const location2 = jobLocations ? (jobLocations.length > 1 ? jobLocations[1] : job.location2) : job.location2;


    return (
        <ClickableOpacityDiv gradientBorder onClick={onClick} key={index} style={{ position: 'relative', minHeight: minHeight, maxHeight: '120px', overflow: 'hidden', display: 'flex', padding: '30px', alignItems: 'center', backgroundColor: AppColors.white, boxShadow: `0 0 2px 1px ${AppColors.card}`, marginBottom: '16px', borderRadius: '12px', }}>

            {jobData?.company_logo ? <JobInfoCell cellIndex={0}><img src={jobData?.company_logo ?? ''} style={{ width: '60px', height: '60px', border: 'none', borderColor: 'transparent', borderRadius: '14px', objectFit: 'cover' }} /></JobInfoCell>
                : <JobInfoCell cellIndex={0}><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '60px', height: '60px' }}><AppLogoRoundedSmall /></div></JobInfoCell>
            }

            {/* Job Title */}
            <JobInfoCell cellIndex={1}>
                <>
                    <Typography variant='body2' style={{ whiteSpace: 'nowrap', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {jobData?.title ?? job.title}<br />
                    </Typography>
                    <Typography variant='h5' style={{ color: AppColors.grey.darkish, marginTop: '4px', whiteSpace: 'nowrap', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {jobData?.company ?? job.company}
                    </Typography>
                </>
            </JobInfoCell>

            {/* Location */}
            <JobInfoCell cellIndex={2}>
                <>
                    <Typography variant='body2' style={{ whiteSpace: 'nowrap', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {location1}
                    </Typography>
                    <Typography variant='h5' style={{ color: AppColors.grey.darkish, marginTop: '4px', whiteSpace: 'nowrap', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {location2 ?? ' '}
                    </Typography>
                </>
            </JobInfoCell>

            <JobInfoCell cellIndex={3}>
                -
            </JobInfoCell>

        </ClickableOpacityDiv>
    )
}

export default DesktopJobCard