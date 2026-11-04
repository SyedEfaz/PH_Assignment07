import './globals.css'
import Providers from './providers'
import { metadata } from '../src/lib/metadata'

export { metadata }

export default function RootLayout({ children }) {
  return <html lang="bn"><body><Providers>{children}</Providers></body></html>
}
