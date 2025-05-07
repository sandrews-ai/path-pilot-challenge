import { InputAdornment } from '@mui/material'
import SmallXIcon from '../../assets/icons/small_x_icon'
import { AppColors } from '../../theme/AppTheme'
import ClickableOpacityDiv from './ClickableOpacityDiv'

interface SearchClearButtonProps {
    onClick: () => void
}

const SearchClearButton = (props: SearchClearButtonProps) => {
    const { onClick } = props
    return (
        <InputAdornment sx={{ margin: 0, padding: 0, marginRight: '-12px' }} position="end">
            <ClickableOpacityDiv onClick={onClick} style={{ width: '44px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <SmallXIcon color={AppColors.black} />
            </ClickableOpacityDiv>
        </InputAdornment>
    )
}

export default SearchClearButton