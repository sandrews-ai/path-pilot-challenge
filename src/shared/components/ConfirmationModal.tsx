import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Strings } from "../../i18n";
import { useAppSelector } from "../../redux/hooks";
import FullScreenModalDiv from "../../shared/components/FullScreenModalDiv";
import OutlinedButton from "../../shared/components/OutlinedButton";
import PrimaryButton from "../../shared/components/PrimaryButton";
import { AppColors } from "../../theme/AppTheme";


const StyledContainer = styled('div')((props: { isMobile: boolean }) => ({
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: props.isMobile ? '90%' : '30vw',
    maxHeight: '85vh',
    backgroundColor: AppColors.white,
    paddingTop: '60px',
    borderRadius: '8px',
}));


const StyledButtons = styled('div')((props: { isMobile: boolean }) => ({
    padding: '15px',
    borderTop: `1px solid ${AppColors.grey.border}`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    width: props.isMobile ? 'calc(100% - 30px)' : '100%',
}));

interface ConfirmationModalProps {
    onCancel: () => void;
    onConfirm: () => void;
    title: string;
    subtitle: ReactNode;
    confirmText?: string;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
    const { title, subtitle, onCancel, onConfirm, confirmText } = props;
    const { t } = useTranslation();
    const isMobile = useAppSelector(store => store.appState.isMobile);

    return (
        <FullScreenModalDiv>
            <StyledContainer isMobile={isMobile}>
                <Typography variant='h2' style={{ marginBottom: '21px', textAlign: 'center', width: '100%', padding: '0px 24px' }}>
                    {title}
                </Typography>
                <Typography variant='h5' style={{
                    textAlign: 'center',
                    marginBottom: '60px',
                    color: AppColors.grey.darkish,
                    paddingLeft: '50px',
                    paddingRight: '50px',
                }}>
                    {subtitle}
                </Typography>
                <StyledButtons isMobile={isMobile}>
                    <PrimaryButton height="50px" title={confirmText?.toUpperCase() ?? t(Strings.yes).toUpperCase()} disabled={false} onClick={onConfirm} style={{ width: '140px' }} />
                    <OutlinedButton height="50px" title={t(Strings.cancel).toUpperCase()} disabled={false} onClick={onCancel} style={{ width: '140px' }} />
                </StyledButtons>
            </StyledContainer>
        </FullScreenModalDiv>
    )
}

export default ConfirmationModal;