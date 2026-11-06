'use client'

import { Toaster } from 'react-hot-toast'

export default function Providers({ children }) {
  return <>


  
    <div className="min-h-screen">{children}</div>
    <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
  </>
}
