import { createTheme } from "@mui/material";

export const AppColors = {
    lightBlue: '#BAE9FF',
    blue: '#1494F4',
    link: '#0174EA',
    pink: {
        light: '#FED6FF',
        dark: '#CD4CD0',
    },
    grey: {
        dark: '#6C7275',
        darkish: '#999DA0',
        borderDark: '#979797',
        border: '#D6D8DA',
        neutral: '#D8D8D8',
        lightish: '#E5E5E5',
        light: '#F5F5F5',
        lightest: '#F9F9F9',
    },
    card: '#F8F8F8',
    white: '#FFFFFF',
    black: '#141718',
    error: '#f00',
    success: '#4bb543',
    loading: 'rgba(0, 0, 0, 0.3)',
    separator: '#EDEDED',
    border: '#F2F2F2',
};

export const BoxShadow = `0 2px 12px 0px rgba(0,0,0,0.1)`;

const appTheme = createTheme({
    palette: {
        primary: {
            main: AppColors.white,
        },
        background: {
            default: AppColors.white,
            paper: AppColors.grey.light,
        }
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            }
        }
    },
    typography: {
        fontFamily: 'Poppins',
        subtitle1: {
            fontWeight: 300,
            fontSize: '14px',
        },
        subtitle2: {
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '14px',
        },
        caption: {
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '12px',
        },
        body1: {
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '30px',
        },
        body2: {
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '22px',
        },
        h1: {
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '20px',
        },
        h2: {
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '21px',
        },
        h3: {
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '16px',
        },
        h4: {
            fontFamily: 'Poppins',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '24px',
        },
        h5: {
            fontFamily: 'Karla',
            fontSize: '16px',
            lineHeight: '24px',
        },
        h6: {
            fontFamily: 'Karla',
            fontSize: '14px',
        }
    }
});

export const sharpTransition = 'cubic-bezier(0.4, 0, 0.6, 1)';

export default appTheme;