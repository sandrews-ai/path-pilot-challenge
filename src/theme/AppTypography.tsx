import { AppColors } from "./AppTheme";

const tabItemBase = {
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: 500,
};

const AppTypography = {
    tabItemSelected: {
        ...tabItemBase,
        color: AppColors.black,
    },
    tabItemUnselected: {
        ...tabItemBase,
        color: AppColors.grey.dark,
    },
    tabAction: {
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: '14px',
        color: AppColors.white,
    }
}

export default AppTypography;
