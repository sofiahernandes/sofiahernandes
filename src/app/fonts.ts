import localFont from 'next/font/local';
import { DM_Sans } from 'next/font/google';

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const rethink = localFont({
  src: [
    {
      path: '../../public/fonts/rethink/RethinkSans-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/rethink/RethinkSans-MediumItalic.woff',
      weight: '500',
      style: 'italic',
    },

    {
      path: '../../public/fonts/rethink/RethinkSans-SemiBold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/rethink/RethinkSans-SemiBoldItalic.woff',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/rethink/RethinkSans-Bold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/rethink/RethinkSans-BoldItalic.woff',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-rethink',
  display: 'swap',
  preload: true,
});
