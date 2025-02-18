import localFont from 'next/font/local';

const moranga = localFont({
  variable: '--font-moranga',
  src: [
    {
      path: './moranga/Latinotype - Moranga Regular.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './moranga/Latinotype - Moranga Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './moranga/Latinotype - Moranga Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './moranga/Latinotype - Moranga Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
});

export { moranga };
