import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import NavBar from 'components/NavBar'
import LogoLink from 'components/Logo'
import localFont from 'next/font/local'
import Footer from 'components/Footer'
import ScrollBackground from 'components/backgroundSwitcher'
import TimeBasedGradient from 'components/betterBackground'

const founder = localFont({
  // src: '../public/fonts/founders-grotesk-bold.woff2',
  variable: '--font-primary',
  display: 'swap',
  src: [
    {
      path: '../../../public/fonts/founders-grotesk-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/founders-grotesk-regular-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/founders-grotesk-light.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/founders-grotesk-light-italic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/founders-grotesk-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/founders-grotesk-medium-italic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/founders-grotesk-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/founders-grotesk-semibold-italic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/founders-grotesk-bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/founders-grotesk-bold-italic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
})

const fragment = localFont({
  // src: '../public/fonts/founders-grotesk-bold.woff2',
  variable: '--font-secondary',
  display: 'swap',
  src: [
    {
      path: '../../../public/fonts/PPFragment-TextRegular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/PPFragment-TextRegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
})

export const metadata: Metadata = {
  title: 'Storytale Studio',
  description: 'The home of stories and tales',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${founder.variable} ${fragment.variable}`}>
        {children}
        <NavBar />
        <LogoLink />
        <footer data-section="hero">
          <Footer />
        </footer>
        {/* <ScrollBackground /> */}
        {/* <TimeBasedGradient /> */}
      </body>
    </html>
  )
}
