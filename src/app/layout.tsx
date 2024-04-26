// import './globals.css'

// import { Inter } from 'next/font/google'
import { Cairo } from 'next/font/google'

import StoreProvider from '@/providers/redux'
import { Toaster } from 'sonner'
import { ReactQueryProvider } from '@/providers/query'
import { cookies } from 'next/headers'
import { COOKIE_LANG } from '@/lib/constants'
import { cn } from '@/lib/utils'

// const inter = Inter({ subsets: ['latin'] })
const cairo = Cairo({ subsets: ['latin'] })

interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps) {

  const cookiesClient = cookies()
  const language = cookiesClient.get(COOKIE_LANG)?.value ?? 'english'

  return (
    <html lang={language === 'english' ? 'en' : 'ar'} dir={language === 'english' ? 'ltr' : 'rtl'}>
      <body className={cn(
        language === 'english' ? "": cairo.className,
        language === 'english' ? 'ltr' : 'rtl',
      )}>
        <ReactQueryProvider>
          <StoreProvider>
            <Toaster position='top-center' richColors />
            {children}
          </StoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
