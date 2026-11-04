import './globals.css'
import Providers from './providers'
import { metadata } from '../src/lib/metadata'

// Next.js requires route metadata to be exported from the root layout.
// oxlint-disable-next-line react/only-export-components
export { metadata }

export default function RootLayout({ children }) {
  return <html lang="bn"><body><Providers>{children}</Providers></body></html>
}
