export const tokens = {
    colors: {
        primary: {
            main: '#4F46E5', // Indigo 600
            light: '#818CF8', // Indigo 400
            dark: '#3730A3',  // Indigo 800
            contrast: '#FFFFFF',
        },
        secondary: {
            main: '#EC4899', // Pink 500
            light: '#F472B6', // Pink 400
            dark: '#BE185D',  // Pink 700
            contrast: '#FFFFFF',
        },
        surface: {
            background: '#F9FAFB', // Gray 50
            card: '#FFFFFF',
            border: '#E5E7EB',     // Gray 200
            overlay: 'rgba(255, 255, 255, 0.60)', // Backdrop blur style
        },
        text: {
            primary: '#1F2937',   // Gray 800
            secondary: '#6B7280', // Gray 500
            disabled: '#9CA3AF',  // Gray 400
            inverse: '#FFFFFF',
        },
        status: {
            success: {
                bg: '#ECFDF5', // Emerald 50
                text: '#059669', // Emerald 600
                border: '#A7F3D0', // Emerald 200
            },
            warning: {
                bg: '#FFF7ED', // Orange 50
                text: '#EA580C', // Orange 600
                border: '#FED7AA', // Orange 200
            },
            error: {
                bg: '#FEF2F2', // Red 50
                text: '#DC2626', // Red 600
                border: '#FECACA', // Red 200
            },
            info: {
                bg: '#EEF2FF', // Indigo 50
                text: '#4F46E5', // Indigo 600
                border: '#C7D2FE', // Indigo 200
            }
        }
    },
    typography: {
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
        },
        fontSizes: {
            xs: '0.75rem',    // 12px
            sm: '0.875rem',   // 14px
            base: '1rem',     // 16px
            lg: '1.125rem',   // 18px
            xl: '1.25rem',    // 20px
            '2xl': '1.5rem',  // 24px
            '3xl': '1.875rem',// 30px
        },
        fontWeights: {
            light: 300,
            regular: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        }
    },
    spacing: {
        1: '0.25rem', // 4px
        2: '0.5rem',  // 8px
        3: '0.75rem', // 12px
        4: '1rem',    // 16px
        6: '1.5rem',  // 24px
        8: '2rem',    // 32px
        12: '3rem',   // 48px
    },
    borderRadius: {
        sm: '0.125rem', // 2px
        md: '0.375rem', // 6px
        lg: '0.5rem',   // 8px
        xl: '0.75rem',  // 12px
        full: '9999px',
    },
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    }
} as const;
