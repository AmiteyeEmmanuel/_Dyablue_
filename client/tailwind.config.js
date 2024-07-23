/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter'],
            },
            colors: {
                'white': '#fff',
                'off-white': '#f3f4f6',
                'black': '#000',
                'yellow': '#FFC55A',
                'off-black': '#31363F',
                'grey': '#b2bebd',
                'blue': '#153448',
                'dark-pink':'#FF577F',
                'brown': '#561C24',
                'light-brown': '#6B240C',
                'orange': '#ff7849',
                'footer-color': '#000f26',
                'light-red':'#ed6462',
                'gold': '#b4a572',
                'dark-blue': '#5AB2FF',
                'green': '#1C7947',
                'light-green': '#9DC08B',
                'gray-dark': '#273444',
                'gray': '#8492a6',
                'gray-light': '#AAAAAA',
                'red': '#5b0e0e',
                'grey-white':'#B8B5FF'
            },
            // screens: {
            //     'xs':
            //     {
            //         'max':'630px'
            //     },
             
            //     // => @media (max-width: 240px) { ... }
                 
            //     'sm': '640px',
            //     // => @media (min-width: 640px) { ... }
          
            //     'md': '768px',
            //     // => @media (min-width: 768px) { ... }
          
            //     'lg': '1024px',
            //     // => @media (min-width: 1024px) { ... }
          
            //     'xl': '1280px',
            //     // => @media (min-width: 1280px) { ... }
          
            //     '2xl': '1536px',
            //     // => @media (min-width: 1536px) { ... }
            // },
            boxShadow: {
                bottom: '0 5px 6px -7px rgba(0, 0, 0, 0.6), 0 2px 4px -5px rgba(0, 0, 0, 0.06)',
            },
        },
    },
}
