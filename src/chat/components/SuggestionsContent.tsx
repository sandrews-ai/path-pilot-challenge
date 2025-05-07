import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { sendMessageAction } from '../../redux/actions/ChatActions';
import { useAppDispatch } from '../../redux/hooks';
import SuggestionRow from '../../shared/components/SuggestionRow';

const StyledColumn = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: '40px',
    gap: '12px',
}));

interface SuggestionsContentProps {
    title?: string;
    suggestions: string[];
    inverted?: boolean;
}

const SuggestionsContent = (props: SuggestionsContentProps) => {
    const { title, suggestions, inverted } = props;
    const dispatch = useAppDispatch();

    const onSuggestionPressed = (suggestion: string) => {
        dispatch(sendMessageAction(suggestion));
    }

    return (
        <StyledColumn>
            <Typography variant='body2' style={{ marginBottom: '11px' }}>
                {title ?? 'Related topics'}
            </Typography>
            {suggestions.slice(0, 3).map((suggestion, index) => (
                <SuggestionRow invertColors={inverted} key={index} title={suggestion} onClick={() => onSuggestionPressed(suggestion)} />
            ))}
        </StyledColumn>
    );
}

export default SuggestionsContent;