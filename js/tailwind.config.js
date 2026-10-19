tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: '#F7F1E7',
        surface: '#FFFDF9',
        ink: '#1A1512',
        muted: '#6B5D4F',
        guajillo: '#C1121F',
        guajillodeep: '#9E0B22',
        agave: '#134E3F',
        onagave: '#C9D6CC',
        paprika: '#A34E08',
        /* Bordes de controles interactivos. 3:1 o mas contra paper y surface (WCAG 1.4.11). */
        edge: '#7A6A59',
      },
      borderRadius: {
        sello: '2px',
      },
    },
  },
};
