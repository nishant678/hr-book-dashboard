/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts,scss,css}",
    ],
    theme: {
        extend: {
            colors: {
                slate: {
                    900: '#0F172A',
                    800: '#1E293B',
                    700: '#334155',
                    600: '#475569',
                    500: '#64748B',
                    400: '#94A3B8',
                    300: '#CBD5E1',
                    200: '#E2E8F0',
                    100: '#F1F5F9',
                },
                indigo: {
                    600: '#6366F1',
                    700: '#4F46E5',
                },
                green: {
                    400: '#22C55E',
                    500: '#16A34A',
                },
                red: {
                    400: '#EF4444',
                    500: '#DC2626',
                },
                yellow: {
                    400: '#F59E0B',
                    500: '#F97316',
                },
                blue: {
                    400: '#60A5FA',
                    500: '#3B82F6',
                },
            },
        },
    },
    plugins: [],
}
