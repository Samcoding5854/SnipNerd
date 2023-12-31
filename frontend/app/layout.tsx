import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Nav, Footer} from '@/components'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SnipNerd',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
            <Nav/>
            {children}
            <Footer/>
        </Providers>
      </body>
    </html>
  )
}