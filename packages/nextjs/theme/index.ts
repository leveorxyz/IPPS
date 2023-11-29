import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        color: '#BCBCBC',
        background: '#132235',
      },
    },
  },
  colors: {
    white: {
      100: '#E2E2E2',
      200: '#D7D7D7',
    },
    gray: {
      100: '#BCBCBC',
    },
    brand: {
      100: '#132235',
    },
    blue: {
      100: '#4274C4',
    },
    chocolate: {
      100: '#302D42',
      200: '#272435',
    },
    gradient: {
      button: 'linear-gradient(93.51deg, #4274C4 2.84%, #B0FF93 99.18%)',
      step: 'linear-gradient(93.51deg, #4274C4 2.84%, #B0FF93 99.18%)',
      card: 'linear-gradient(93.51deg, #4274C4 2.84%, #B0FF93 99.18%)',
    },
  },

  fonts: {
    body: 'Poppins',
    heading: 'Poppins',
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  components: {
    Button: {
      variants: {
        outline: {
          color: 'gray.100',
          borderColor: 'white.200',
          _active: {
            color: 'white',
            background: 'gradient.button',
          },
          _hover: {
            color: 'white',
            background: 'gradient.button',
            borderColor: 'transparent',
          },
        },
        solid: {
          color: 'white',
          background: 'gradient.button',
          _active: {
            color: 'gray.100',
            background: 'transparent',
            border: '2px solid',
            borderColor: 'white.200',
          },
          _hover: {
            color: 'gray.100',
            background: 'transparent',
            border: '2px solid',
            borderColor: 'white.200',
          },
        },
      },
    },
  },
});

export default customTheme;
