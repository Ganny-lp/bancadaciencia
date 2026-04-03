/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Isso varre tudo dentro de src
    ],
    theme: {
        extend: {
            // Suas cores personalizadas continuam aqui
            colors: {
                'banca-escuro': '#0c3d7a',
                'banca-medio': '#2a6ebf',
                'banca-claro': '#70a8ff',
            },
        },
    },
    plugins: [],
}