export const BASE_THEME = 'BASE_THEME';
export const DARK_THEME = 'DARK_THEME';

export default {
    [BASE_THEME]: {
        primary: '#57199E', // rgbToHex(87, 25, 158);
        secondary: '#36393F',
        onSecondary: '#4B4B4B',
        surface: '#e0f5f8',
        onSurface: '#65586F',
        disabled: '#9F9F9F',
        error: '#B00020',
        isDark: false,
    },
    [DARK_THEME]: {
        primary: '#000',
    }
}