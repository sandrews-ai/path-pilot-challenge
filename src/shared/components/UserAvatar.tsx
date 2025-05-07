import Avatar from '@mui/material/Avatar';
import { AppColors } from '../../theme/AppTheme';

interface UserAvatarProps {
    imageUrl?: string;
    small?: boolean;
}

const UserAvatar = (props: UserAvatarProps) => {
    const { imageUrl, small } = props;
    return (
        <Avatar src={imageUrl} alt='Profile picture' sx={{ height: small ? '27px' : undefined, width: small ? '27px' : undefined, backgroundColor: AppColors.pink.dark, fontFamily: 'Poppins', fontWeight: '400', fontSize: small ? '14px' : '20px' }}>
            PP
        </Avatar>
    )
}

export default UserAvatar