// src/app/fonts.ts
import localFont from 'next/font/local'

export const rethink = localFont({
  src: [
    {
      path: '../public/fonts/rethink/RethinkSans-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/rethink/RethinkSans-MediumItalic.woff',
      weight: '500',
      style: 'italic',
    },

    {
      path: '../public/fonts/rethink/RethinkSans-SemiBold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/rethink/RethinkSans-SemiBoldItalic.woff',
      weight: '700',
      style: 'italic',
    },

    {
      path: '../public/fonts/rethink/RethinkSans-Bold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/rethink/RethinkSans-BoldItalic.woff',
      weight: '800',
      style: 'italic',
    },

    // remove any entries for files you don't actually have
  ],
  variable: '--font-rethink',
  display: 'swap',
  preload: true,
})
