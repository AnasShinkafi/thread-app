import Topbar from '@/components/shared/Topbar'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Bottombar from '@/components/shared/Bottombar'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Threads',
  description: 'A Next.js 13 Meta Threads Application'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <Topbar />

          <main className='flex flex-row'>
            <LeftSidebar />

            <section className="min-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>

            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
