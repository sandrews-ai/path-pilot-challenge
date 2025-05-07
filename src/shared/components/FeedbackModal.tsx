import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Strings } from "../../i18n";
import { useAppSelector } from "../../redux/hooks";
import FullScreenModalDiv from "../../shared/components/FullScreenModalDiv";
import OutlinedButton from "../../shared/components/OutlinedButton";
import PrimaryButton from "../../shared/components/PrimaryButton";
import { AppColors } from "../../theme/AppTheme";
import PPMultiLineTextInput from "./PPMultiLIneTextInput";


const StyledContainer = styled('div')((props: { isMobile: boolean }) => ({
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: props.isMobile ? '90%' : '30vw',
    maxHeight: '85vh',
    backgroundColor: AppColors.white,
    paddingTop: '40px',
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

interface FeedbackModalProps {
    onCancel: () => void;
    onConfirm: (feedback: string) => void;
    title: string;
    subtitle: ReactNode;
    confirmText?: string;
}

const FeedbackModal = (props: FeedbackModalProps) => {
    const { title, subtitle, onCancel, onConfirm, confirmText } = props;
    const { t } = useTranslation();
    const isMobile = useAppSelector(store => store.appState.isMobile);
    const [feedback, setFeedback] = useState('');

    return (
        <FullScreenModalDiv>
            <StyledContainer isMobile={isMobile}>
                <Typography variant='h2' style={{ marginBottom: '21px', textAlign: 'center', width: '100%', padding: '0px 24px' }}>
                    {title}
                </Typography>
                <Typography variant='h5' style={{
                    textAlign: 'center',
                    marginBottom: '10px',
                    color: AppColors.grey.darkish,
                    paddingLeft: '50px',
                    paddingRight: '50px',
                }}>
                    {subtitle}
                </Typography>
                <div style={{ padding: '20px 40px', paddingTop: '5px', width: '100%', boxSizing: 'border-box', }}>
                    <PPMultiLineTextInput
                        id={'feedback-input'}
                        value={feedback}
                        onChange={(newMessage) => setFeedback(newMessage)}
                        maxRows={12}
                        placeholder="Describe the bug..."
                        style={{
                            border: '1px #EEE solid',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            width: '100%',
                            boxSizing: 'border-box',
                        }} />
                </div>
                <StyledButtons isMobile={isMobile}>
                    <PrimaryButton height="50px" title={confirmText?.toUpperCase() ?? t(Strings.yes).toUpperCase()} disabled={false} onClick={() => onConfirm(feedback)} style={{ width: '140px' }} />
                    <OutlinedButton height="50px" title={t(Strings.cancel).toUpperCase()} disabled={false} onClick={onCancel} style={{ width: '140px' }} />
                </StyledButtons>
            </StyledContainer>
        </FullScreenModalDiv>
    )
}

export default FeedbackModal;